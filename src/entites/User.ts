import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { length: 200 })
    firstname: string;

    @Column({ type: 'text' })
    lastname: string;

    @Column({ type: 'text', unique: true, })
    email: string

    @Column({ type: 'text', unique: true, })
    mobile_no: number

    @Column({ type: "boolean" })
    admin: boolean

    @Column({ type: "text" })
    password: string

    @OneToMany(() => Product, (product) => product.user)
    products: Product[]
}



// "strictPropertyInitialization": false