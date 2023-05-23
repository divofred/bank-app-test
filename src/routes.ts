import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/",
    controller: UserController,
    action: "home"
},
{
    method: "put",
    route: "/account/debit",
    controller: UserController,
    action: "debit"
},{
    method: "put",
    route: "/account/credit",
    controller: UserController,
    action: "credit"
},
{
    method: "put",
    route: "/account/transfer",
    controller: UserController,
    action: "transfer"
},
{
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]