import { Request, Response } from 'express';
import Item from '@interfaces/items.interface';
import ItemsService from '@services/items.service';
import { asyncHandler } from '@/handlers/async.handler';
import { ReadItemDto } from '@dtos/items.dto';
import { mapToReadDto } from '@/utils/mapper';
class ItemsController {
  private _itemsService = new ItemsService();

  public getAllItems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const items = await this._itemsService.findAll();
    res.status(200).json({ data: items, success: true });
  });

  public getItemById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const item: readItemDto = await this._itemsService.findById(id);

    res.status(200).json({ data: item, success: true });
  });

  public createItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const creatingItem: Item = req.body;

    const createdItemId = await this._itemsService.create(creatingItem);

    res.status(201).json({ data: createdItemId, success: true });
  });
  public updateItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await this._itemsService.update(id, req.body);
    res.status(200).json(result);
  });

  public deleteItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await this._itemsService.delete(id);
    res.status(200).json(result);
  });
}

export default ItemsController;
