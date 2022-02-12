import { Request, Response } from 'express';
import ItemsService from '@services/items.service';
import { asyncHandler } from '@/handlers/async.handler';
import { CreateItemDto, ReadItemDto } from '@dtos/items.dto';
class ItemsController {
  private _itemsService;
  constructor() {
    console.log(this);
    this._itemsService = new ItemsService();
  }
  // GET /?completed=true/false
  // GET /
  public getAllItems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const query = req.query;
    console.log(this);
    const items = await this._itemsService.findAll(query);
    res.status(200).json({ data: items, success: true });
  });

  public getItemById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const item: ReadItemDto = await this._itemsService.findById(id);

    res.status(200).json({ data: item, success: true });
  });

  public createItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const creatingItem: CreateItemDto = req.body;
    console.log(req.body);
    const readItemDto: ReadItemDto = await this._itemsService.create(creatingItem);

    res.status(201).json({ data: readItemDto, success: true });
  });

  public updateItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await this._itemsService.update(id, req.body);
    res.status(200).json(result);
  });

  public updateMultipleItems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const toUpdateTodos = req.body.data;
    const result = await this._itemsService.updateMultipleItems(toUpdateTodos);
    res.status(200).json(result);
  });

  public deleteItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await this._itemsService.delete(id);
    res.status(200).json(result);
  });

  public deleteMultipleItems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const ids = req.body;
    const result = await this._itemsService.deleteMultipleItems(ids);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  });
}

export default ItemsController;
