import { Router } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { IRoutes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ItemsController from '@controllers/items.controller';

class ItemsRoute implements IRoutes {
  public path = '/items';
  public router = Router();
  public itemsController;

  constructor() {
    this.itemsController = new ItemsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const { getAllItems, getItemById, createItem, updateItem, deleteItem } = this.itemsController;

    this.router.route(`${this.path}`).get(getAllItems).post(validationMiddleware(CreateUserDto, 'body'), createItem);
    this.router.route(`${this.path}/:id`).get(getItemById).put(validationMiddleware(CreateUserDto, 'body', true), updateItem).delete(deleteItem);
  }
}

export default ItemsRoute;
