import Item from '@interfaces/items.interface';
import CommonService from '@interfaces/service.interface';
import ItemsRepository from '@/repositories/items.repository';
import { getConnection, SelectQueryBuilder } from 'typeorm';
import { ItemEntity } from '@entities/items.entity';
import { HttpException } from '../exceptions/HttpException';
import { CreateItemDto, ReadItemDto } from '@/dtos/items.dto';
import { mapToReadDto } from '@/utils/mapper';

class ItemsService implements CommonService<Item> {
  private _repository: ItemsRepository = getConnection().getRepository(ItemEntity);

  findAll = async (query?: any): Promise<ReadItemDto[]> => {
    let foundItems: ReadItemDto[];
    if (!query) {
      // no query
      foundItems = await this._repository.find();
    } else {
      // query exists
      const queryBuilder: SelectQueryBuilder<ItemEntity> = this._repository.createQueryBuilder('items');

      if (query.completed !== undefined) {
        queryBuilder.andWhere('items.completed = :completed', { completed: query.completed });
      }
      if (query.priority !== undefined) {
        queryBuilder.andWhere({ priority: query.priority });
      }
      //sort=
      if (query.sort !== undefined) {
        let sortBy: string = query.sort;
        let sortDir: 'ASC' | 'DESC' = 'DESC';

        const length = query.sort.length;
        const lastTwoLetters = sortBy.substring(length - 2, length);
        //sort=createdat
        if (lastTwoLetters === 'at') {
          // capitalize a, to make
          // createdat -> createdAt
          const capitalizedA = lastTwoLetters[0].toUpperCase();

          sortBy = sortBy.substring(0, length - 2) + capitalizedA + sortBy.substring(length - 1);
        }
        // sort = createdat,-1
        else if (lastTwoLetters == ' 1' || lastTwoLetters == '-1') {
          const capitalizedA = sortBy.substring(length - 5, length - 4).toUpperCase();

          sortBy = sortBy.substring(0, length - 5) + capitalizedA + sortBy.substring(length - 4, length - 3);

          sortDir = lastTwoLetters == ' 1' ? 'ASC' : 'DESC';
        }
        queryBuilder.orderBy(`items.${sortBy}`, sortDir);
      }

      // date=2022-01-21
      if (query.date !== undefined) {
        const startDate = new Date(query.date);
        startDate.setHours(0);
        const endDate = new Date(startDate.getTime() + 86400000);

        queryBuilder
          .andWhere('items.createdAt >= :startDate', {
            startDate: startDate,
          })
          .andWhere('items.createdAt < :endDate', { endDate: endDate });
      }

      // wrap up and g et items.
      foundItems = await queryBuilder.getMany();
    }
    return foundItems;
  };
  async findById(id: string): Promise<ReadItemDto> {
    const itemFound = await this._repository.findOne({ id });
    if (!itemFound) {
      throw new HttpException(404, `Item of id: ${id} not found.`);
    }
    const readItemDto: ReadItemDto = await mapToReadDto(ReadItemDto, itemFound);

    return readItemDto;
  }

  async create(item: CreateItemDto): Promise<ReadItemDto> {
    const readItemDto: ReadItemDto = await this._repository.save(item);
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

  updateMultipleItems = async (toUpdateTodos: any[]): Promise<Object> => {
    let affected = 0;
    for (const toUpdateTodo of toUpdateTodos) {
      const result = await this._repository.update(toUpdateTodo.id, toUpdateTodo.option);
      affected += result.affected;
    }

    let success: boolean;
    if (affected === toUpdateTodos.length) {
      success = true;
    } else {
      success = false;
    }

    return { success, affected: affected };
  };

  patch = async (): Promise<Item> => {
    return new ItemEntity();
  };

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
