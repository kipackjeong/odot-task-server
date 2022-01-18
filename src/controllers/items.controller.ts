import { NextFunction, Request, Response } from 'express';
import Item from '@interfaces/items.interface';
import ItemsService from '@services/items.service';
import { asyncHandler } from '@/handlers/async.handler';

class ItemsController {
  private _itemsService = new ItemsService();

  getAllItems = asyncHandler(async (req: Request, res: Response) => {
    const items = await this._itemsService.findAll();
    res.status(200).send({ data: items, success: true });
  });
  // getAllItems = async (req: Request, res: Response, next: NextFunction) => {
  //   const items = await this._itemsService.findAll();

  //   res.status(200).send({ data: items, success: true });
  // };

  getItemById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const item = await this._itemsService.findById(id);

    res.status(200).send({ data: item, success: true });
  });
  createItem = asyncHandler(async (req: Request, res: Response) => {
    const creatingItem: Item = req.body;

    const createdItemId = await this._itemsService.create(creatingItem);

    res.status(201).send({ data: createdItemId, success: true });
  });
  updateItem = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await this._itemsService.update(id, req.body);
    res.status(200).send(result);
  });

  deleteItem = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await this._itemsService.delete(id);
    res.status(200).send(result);
  });
}

export default ItemsController;
