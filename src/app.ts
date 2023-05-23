import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { Routes } from "./routes"
const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(async result => {
                  result !== null && result !== undefined ? res.status(result.status).json({message: await result.message}) : undefined
                })

            } else if (result !== null && result !== undefined) {
                res.status(result.status).json({message: await result.message})
            }
        })
    })

export default app;