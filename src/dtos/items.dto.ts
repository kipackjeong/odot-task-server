import { Priority } from '@/enums/item.enum';
import Item from '@interfaces/items.interface';
import { IsEmpty } from 'class-validator';

export class ReadItemDto implements Item {
  id: string;
  task: string;
  priority: Priority;
  completed: boolean;

  createdAt: Date;
  modifiedAt: Date;
  dueDate: Date;
}

export class CreateItemDto {
  task: string;
  dueDate?: Date;
  priority: Priority;
}
