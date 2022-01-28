import { ItemEntity } from '@/entities/items.entity';
import Item from '@interfaces/items.interface';
import { ReadItemDto } from '../dtos/items.dto';
const dateToString = (date): string => {
  return Date.toString();
};
// generic
interface IMapper<T, U> {
  (toType: ThisType<T>, object: U): Promise<T>;
}

//TODO: readItemDto takes in all the prop from the Item, which is not the behavior I want. I need to fix this.

export const mapToReadDto: IMapper<ReadItemDto, Item> = async (readItemDtoType: typeof ReadItemDto, item: Item): Promise<ReadItemDto> => {
  const readItemDto: ReadItemDto = new readItemDtoType();

  Object.keys(item).forEach(property => {
    readItemDto[property] = item[property];
  });
  return readItemDto;
};
