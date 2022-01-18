import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { IRoutes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements IRoutes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}signup`).post(validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.route(`${this.path}login`).post(validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.route(`${this.path}logout`).post(authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
