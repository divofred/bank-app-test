import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return { message: this.userRepository.find(), status: 200 };
  }

  async home(request: Request, response: Response, next: NextFunction) {
    return { message: 'Welcome to the home page', status: 200 };
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return { message: 'unregistered user', status: 400 };
    }
    return { message: user, status: 200 };
  }

  async save(request: Request, response: Response, next: NextFunction) {
    if (!request.body.username || !request.body.password) {
      return { message: 'please fill all fields', status: 400 };
    }
    const { username, password, account } = request.body;
    const userTest: any = await this.userRepository.findOne({
      where: { username },
    });
    if (userTest) {
      return { message: 'this username already exist', status: 400 };
    }
    const user = Object.assign(new User(), {
      username,
      password,
    });

    return { message: this.userRepository.save(user), status: 201 };
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return { message: 'this user does not exist', status: 400 };
    }

    await this.userRepository.remove(userToRemove);

    return { message: 'user has been removed', status: 200 };
  }
  async credit(request: Request, response: Response, next: NextFunction) {
    const { username, amount } = request.body;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return { message: 'this user does not exist', status: 400 };
    }
    return {
      message: await this.userRepository.update(
        { id: user.id },
        { account: user.account + amount }
      ),
      status: 201,
    };
  }
  async transfer(request: Request, response: Response, next: NextFunction) {
    const { username, amount, recipient } = request.body;
    const user = await this.userRepository.findOne({ where: { username } });
    const recipientUser = await this.userRepository.findOne({
      where: { username: recipient },
    });
    if (!user) {
      return { message: 'this user does not exist', status: 400 };
    }
    if (!recipientUser) {
      return { message: 'this recipient does not exist', status: 400 };
    }
    if (user.account < amount) {
      return { message: 'insufficient funds', status: 400 };
    }

    await this.userRepository.update(
      { id: recipientUser.id },
      { account: recipientUser.account + amount }
    );
    return {
      message: await this.userRepository.update(
        { id: user.id },
        { account: user.account - amount }
      ),
      status: 201,
    };
  }
  async debit(request: Request, response: Response, next: NextFunction) {
    const { username, amount } = request.body;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return { message: 'this user does not exist', status: 400 };
    }
    if (user.account < amount) {
      return { message: 'insufficient funds', status: 400 };
    }
    return {
      message: await this.userRepository.update(
        { id: user.id },
        { account: user.account - amount }
      ),
      status: 201,
    };
  }
}
