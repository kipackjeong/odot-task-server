import { Router } from 'express';
import { IRoutes } from '@interfaces/routes.interface';
import ItemsController from '@controllers/items.controller';

class ItemsRoute implements IRoutes {
  public path = '/items';
  public router = Router();
  public itemsController: ItemsController;

  constructor() {
    this.itemsController = new ItemsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const { getAllItems, getItemById, createItem, updateItem, deleteItem, updateMultipleItems, deleteMultipleItems } = this.itemsController;

    this.router.route(`${this.path}`).get(getAllItems).post(createItem).put(updateMultipleItems).delete(deleteMultipleItems);

    this.router.route(`${this.path}/:id`).get(getItemById).put(updateItem).delete(deleteItem);
  }
}

export default ItemsRoute;
