import { Request, Response } from 'express';
import { CreateUserUseCase, DeleteUserUseCase, FindUserByEmailUseCase, FindUserByIdUseCase, FindUserListUseCase, UpdateUserUseCase } from '@domain/usecases/user';
import { CreateUserValidate, UpdateUserValidate } from '@interfaces/validators/UserValidate';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ERROR_CODES } from '@infrastructure/utils/errorCode';
import { ValidationError, DatabaseError, NotFoundError } from '@infrastructure/utils/errors';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private findUserByEmailUseCase: FindUserByEmailUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findUserListUseCase: FindUserListUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const createUserValidate: CreateUserValidate = plainToClass(req.body, CreateUserValidate);
      const error = await validate(createUserValidate);
      if (error) {
        throw new ValidationError(ERROR_CODES.VAL_001);
      }
      const user = await this.createUserUseCase.execute(createUserValidate);
      if (!user) {
        throw new DatabaseError(ERROR_CODES.INTER_001);
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ error: ERROR_CODES.VAL_001 });
      }
      res.status(500).json({ error: ERROR_CODES.INTER_001 });
    }
  }

  async findUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.findUserByIdUseCase.execute(Number(id));
      if (!user) {
        throw new NotFoundError(ERROR_CODES.NF_001);
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ error: ERROR_CODES.NF_001 });
      }
      res.status(500).json({ error: ERROR_CODES.INTER_001 });
    }
  }

  async findUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const user = await this.findUserByEmailUseCase.execute(email);
      if (!user) {
        throw new NotFoundError(ERROR_CODES.NF_001);
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ error: ERROR_CODES.NF_001 });
      }
      res.status(500).json({ error: ERROR_CODES.INTER_001 });
    }
  }

  async findUserList(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (page <= 0 || limit <= 0) {
        throw new ValidationError(ERROR_CODES.VAL_001);
      }
      const userList = await this.findUserListUseCase.execute({ page, limit });
      res.status(200).json(userList);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ error: ERROR_CODES.VAL_001 });
      }
      res.status(500).json({ error: ERROR_CODES.INTER_001 });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateUserValidate: UpdateUserValidate = plainToClass(req.body, UpdateUserValidate);
      const error = await validate(updateUserValidate);
      if (error) {
        throw new ValidationError(ERROR_CODES.VAL_001);
      }
      const user = await this.updateUserUseCase.execute(Number(id), { name: updateUserValidate.name, password: updateUserValidate.password });
      if (!user) {
        throw new DatabaseError(ERROR_CODES.INTER_001);
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ error: ERROR_CODES.VAL_001 });
      }
      res.status(500).json({ error: ERROR_CODES.INTER_001 });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleteUser = await this.deleteUserUseCase.execute(Number(id));
      if (!deleteUser) {
        throw new ValidationError(ERROR_CODES.VAL_001);
      }
      res.status(200).json(deleteUser);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ error: ERROR_CODES.VAL_001 });
      }
      res.status(500).json({ error: ERROR_CODES.INTER_001 });
    }
  }
}
