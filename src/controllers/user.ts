import { Request, Response } from 'express';
import { AppDataSource } from '../config/db-config';
import { User } from '../entites/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import getConnection from 'typeorm';

type UserData = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile_no: number;
    admin: boolean;
    token?: string;
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const user = new User();
        const { firstname, lastname, email, mobile_no, admin, password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.mobile_no = mobile_no;
        user.admin = admin;
        user.password = passwordHash;
        const insertUser = await userRepo.save(user);
        res.status(201).json(insertUser);
    } catch (error) {
        res.status(409).send({ errors: error });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const { email, password: inputPassword } = req.body;
        const user = await userRepo.findOneBy({ email })
        if (!user) return res.status(400).json({ msg: "Invalid credentials." });
        const isMatch = await bcrypt.compare(inputPassword, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
        const key: string = process.env.JWT_SECRET || "harry";
        const token = jwt.sign({ id: user.id, admin: user.admin }, key);
        const responceData: UserData = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            mobile_no: user.mobile_no,
            admin: user.admin,
            token: token
        }
        res.status(200).json({ responceData });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const users: UserData[] = await userRepo.find({
            select: ["id", "firstname", "lastname", "email", "mobile_no", "admin"]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(401).send({ errors: error });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const userId = req.params.id;
        const user: UserData | null = await userRepo.findOne({
            where: { id: userId },
            select: ["id", "firstname", "lastname", "email", "mobile_no", "admin"]
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(401).send({ errors: error });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await AppDataSource.transaction(async (transactionalEntityManager) => {
            const userRepo = AppDataSource.getRepository(User);
            const userId = req.params.id;
            const userData = await userRepo.findOne({
                where: { id: userId },
                relations: ['products']
            });
            await transactionalEntityManager.remove(userData?.products);
            await transactionalEntityManager.remove(userData);
            res.status(200).send("user successfully deleted!");
        })
    } catch (error) {
        res.status(401).send({ errors: error });
    }
}

