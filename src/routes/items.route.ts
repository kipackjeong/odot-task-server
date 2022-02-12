import { Router } from 'express';
import { IRoutes } from '@interfaces/routes.interface';
import ItemsController from '@controllers/items.controller';

class ItemsRoute implements IRoutes {
  public path = '/items';
  public router = Router();
  public itemsController: ItemsController;

  constructor() {
    this.itemsController = ItemsController.getInstance();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}`)
      .get(this.itemsController.getAllItems)
      .post(this.itemsController.createItem)
      .put(this.itemsController.updateMultipleItems)
      .delete(this.itemsController.deleteMultipleItems);

    this.router
      .route(`${this.path}/:id`)
      .get(this.itemsController.getItemById)
      .put(this.itemsController.updateItem)
      .delete(this.itemsController.deleteItem);
  }
}

export default ItemsRoute;
