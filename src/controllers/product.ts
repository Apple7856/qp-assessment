import { Request, Response } from 'express';
import { AppDataSource } from '../config/db-config';
import { Product } from '../entites/Product';


export const addNewProducts = async (req: Request, res: Response) => {
    try {
        const productRepo = AppDataSource.getRepository(Product);
        await productRepo.createQueryBuilder()
            .insert()
            .into(Product)
            .values(req.body)
            .execute();;
        res.status(201).send('Inserted product successfully!');
    } catch (error) {
        res.status(409).send({ errors: error });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productRepo = AppDataSource.getRepository(Product);
        await productRepo.createQueryBuilder().update(Product).set(req.body).where('id = :id', { id: req.params.id }).execute();
        res.status(200).send("Update sucessfully!");
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const productRepo = AppDataSource.getRepository(Product);
        const productsData = await productRepo.createQueryBuilder('product')
            .leftJoinAndSelect('product.user', 'user')
            .where({ isAvailable: true })
            .select(['product', 'user.id', 'user.firstname', "user.lastname", "user.email", "user.mobile_no", "user.admin"])
            .getMany();
        res.status(200).json({ data: productsData });
    } catch (error) {
        console.log("error");
        res.status(401).send({ errors: error });
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const productRepo = AppDataSource.getRepository(Product);
        const productData = await productRepo.createQueryBuilder('product')
            .leftJoinAndSelect('product.user', 'user')
            .where('product.id = :productId', { productId: req.params.id })
            .select(['product', 'user.id', 'user.firstname', "user.lastname", "user.email", "user.mobile_no", "user.admin"])
            .getOne();
        res.status(200).json({ data: productData });
    } catch (error) {
        res.status(401).send({ errors: error });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productRepo = AppDataSource.getRepository(Product);
        await productRepo.delete(req.params.id);
        res.status(200).send("user deleted");
    } catch (error) {
        res.status(401).send({ errors: error });
    }
}

