import Item from '@interfaces/items.interface';
import CommonService from '@interfaces/service.interface';
import ItemsRepository from '@/repositories/items.repository';
import { getConnection, Repository } from 'typeorm';
import { ItemEntity } from '@entities/items.entity';
import { HttpException } from '../exceptions/HttpException';
import { ReadItemDto } from '@/dtos/items.dto';
import { mapToReadDto } from '@/utils/mapper';

class ItemsService implements CommonService<Item> {
  private _repository: ItemsRepository = getConnection().getRepository('items');

  findAll = async (): Promise<ReadItemDto[]> => {
    const foundItems = await this._repository.find();
    // mapped items
    const readItemDtos: ReadItemDto[] = [];

    for (const foundItem of foundItems) {
      const readItemDto = await mapToReadDto(ReadItemDto, foundItem);
      readItemDtos.push(readItemDto);
    }

    return readItemDtos;
  };

  async findById(id: string): Promise<ReadItemDto> {
    const itemFound = await this._repository.findOne({ id });
    if (!itemFound) {
      throw new HttpException(404, `Item of id: ${id} not found.`);
    }
    const readItemDto: ReadItemDto = await mapToReadDto(ReadItemDto, itemFound);

    return readItemDto;
  }

  async create(item: Item): Promise<ReadItemDto> {
    const createdItem = await this._repository.save(item);
    const readItemDto: ReadItemDto = await mapToReadDto(ReadItemDto, createdItem);

    return readItemDto;
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

  delete = async (id: string): Promise<Object> => {
    const result = await this._repository.delete({ id: id });
    let success = false;
    if (result.affected) {
      success = result.affected > 0 && true;
    }

    return { success };
  };
  deleteMultipleItems = async (ids: string[]) => {
    const result = await this._repository.delete(ids);
    if (result.affected === ids.length) {
      return { success: true };
    }

    return { success: false };
  };
}

export default ItemsService;
