import { Router } from 'express';
import { IRoutes } from '@interfaces/routes.interface';
import ItemsController from '@controllers/items.controller';
import itemResultMiddleware from '@/middlewares/item-result.middleware';

class ItemsRoute implements IRoutes {
  public path = '/items';
  public router = Router();
  public itemsController: ItemsController;

  constructor() {
    this.itemsController = new ItemsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const { getAllItems, getItemById, createItem, updateItem, deleteItem } = this.itemsController;

    this.router.route(`${this.path}`).get(getAllItems).post(createItem);
    this.router.route(`${this.path}/:id`).get(getItemById).put(updateItem).delete(deleteItem);
  }
}

export default ItemsRoute;
