import { Priority } from '@/enums/item.enum';

interface Item {
  id?: string;
  task: string;
  priority?: Priority;
}

export default Item;
