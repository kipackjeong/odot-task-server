import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Priority } from '@/enums/item.enum';
import Item from '@interfaces/items.interface';

@Entity('items')
export class ItemEntity implements Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt!: Date;

  @Column({ default: new Date(Date.now() + 3600 * 1000 * 24) })
  dueDate: Date;

  @Column({ enum: [Priority.HIGH, Priority.MEDIUM, Priority.LOW], default: Priority.MEDIUM })
  priority: number;

  @Column({ default: false })
  completed: boolean;
}
