import express, { Request, Response, Router } from 'express';
import { UserController } from '@interfaces/controllers/UserController';


export class UserRoute {
    constructor(

    ){}

    async materialRoutes(userController: UserController) {
        const router = express.Router();
        router.post('/', (req, res) => userController.createUser(req, res));
        router.get('/:id', (req, res) => userController.findUserByEmail(req, res));
        router.get('/:email', (req, res) => userController.findUserByEmail(req, res));
        router.get('/', (req, res) => userController.findUserList(req, res));
        router.put('/:id', (req, res) => userController.updateUser(req, res));
        router.put('/:id', (req, res) => userController.deleteUser(req, res));
    }
}