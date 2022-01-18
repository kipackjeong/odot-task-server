import { EntityRepository, Repository } from 'typeorm';
import { ItemEntity } from '@entities/items.entity';

@EntityRepository(ItemEntity)
class ItemsRepository extends Repository<ItemEntity> {}

export default ItemsRepository;
