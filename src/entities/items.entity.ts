import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Priority } from '@/enums/item.enum';
import Item from '@interfaces/items.interface';

@Entity('items')
export class ItemEntity implements Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task: string;

  @Column({ default: new Date(Date.now()) })
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column({ default: new Date(Date.now() + 1) })
  dueDate: Date;

  @Column({ enum: [Priority.HIGH, Priority.MEDIUM, Priority.LOW], default: Priority.MEDIUM })
  priority: number;
}
