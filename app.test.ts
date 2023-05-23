const express = require('express');
const request = require('supertest');
import app from './src/app';
import { AppDataSource } from './src/data-source';
beforeAll(async () => {
  await AppDataSource.initialize().then(async () => {});
});
describe('Testing the home route', () => {
  test('It should return a status code of 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});

describe('Creating a user', () => {
  test('It should respond with a 201 statusCode', async () => {
    if (AppDataSource.isInitialized) {
      const res = await request(app)
        .post('/users')
        .send({ username: 'test3', password: 'test1' });
      expect(res.statusCode).toEqual(201);
    }
  });
});
describe('Creating the receipient', () => {
  test('It should respond with a 201 statusCode', async () => {
    const res = await request(app)
      .post('/users')
      .send({ username: 'test4', password: 'test2' });
    expect(res.statusCode).toEqual(201);
  });
});
describe('Depositing Funds', () => {
  test('It should respond with a 200 statusCode', async () => {
    const res = await request(app)
      .put('/account/credit')
      .send({ username: 'test3', amount: 1000 });
    expect(res.statusCode).toEqual(201);
  });
});
describe('Transferring Funds', () => {
  test('It should respond with a 200 statusCode', async () => {
    const res = await request(app)
      .put('/account/transfer')
      .send({ username: 'test3', recipient: 'test4', amount: 100 });
    expect(res.statusCode).toEqual(201);
  });
});
describe('Withdrawing Funds', () => {
  test('It should respond with a 200 statusCode', async () => {
    const res = await request(app)
      .put('/account/debit')
      .send({ username: 'test3', amount: 100 });
    expect(res.statusCode).toEqual(201);
  });
});
describe('Getting users', () => {
  test('It should respond with a status code of 200', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });
});
