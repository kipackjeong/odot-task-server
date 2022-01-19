import { Priority } from '@/enums/item.enum';
import Item from '@interfaces/items.interface';
import { IsEmpty } from 'class-validator';

export class ReadItemDto {
  id: string;
  task: string;
  createdAt: string;
  modifiedAt: string;
  dueDate: string;
  priority: Priority;
}
