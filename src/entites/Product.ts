import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { length: 200, unique: true, })
    product_name: string;

    @Column("simple-array")
    product_img: string[];

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int' })
    quantity: number

    @Column({ type: 'simple-array' })
    color: string[]

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'boolean' })
    isAvailable: boolean;

    @ManyToOne(() => User, (user) => user.products)
    user: User

}



// "strictPropertyInitialization": false