import { Priority } from '@/enums/item.enum';

interface Item {
  id?: string;
  task: string;
  createdAt: Date;
  modifiedAt: Date;
  dueDate?: Date;
  priority?: Priority;
}

export default Item;
