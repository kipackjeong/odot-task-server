import debug from 'debug';
import Item from '@interfaces/items.interface';
import CommonService from '@interfaces/service.interface';
import ItemsRepository from '@/repositories/items.repository';
import { EntityNotFoundError, getConnection } from 'typeorm';
import { ItemEntity } from '@entities/items.entity';
import { HttpException } from '../exceptions/HttpException';

class ItemsService implements CommonService<Item> {
  private _repository: ItemsRepository = getConnection().getRepository('items');

  findAll = async (): Promise<Item[]> => {
    return await this._repository.find();
  };
  async findById(id: string): Promise<Item> {
    const itemFound = await this._repository.findOne({ id });
    if (!itemFound) {
      throw new HttpException(404, `Item of id: ${id} not found.`);
    }
    return itemFound;
  }
  async create(item: Item): Promise<string> {
    const createdItem = await this._repository.save(item);
    return createdItem.id;
  }
  async update(id: string, item: Partial<Item>): Promise<Object> {
    const itemFromDB = await this._repository.findOne({ id });
    let success = false;
    if (itemFromDB) {
      const updateResult = await this._repository.update({ id }, item);

      if (updateResult.affected) {
        success = updateResult.affected > 0 ? true : false;
      }
      return { success };
    }
    return { success };
  }
  async patch(): Promise<Item> {
    return new ItemEntity();
  }
  async delete(id: string): Promise<Object> {
    const result = await this._repository.delete({ id: id });
    let success = false;
    if (result.affected) {
      success = result.affected > 0 && true;
    }

    return { success };
  }
}

export default ItemsService;
