import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization");
    if (!token) return res.status(403).send("Access denied!");
    token = token.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET || "dfdjf", (err, decoded) => {
        if (err) {
            res.status(403).send("Invalid token!");
        } else {
            next();
        }
    });
};

export const verifyAdminToken = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization");
    if (!token) return res.status(403).send("Access denied!");
    token = token.split(" ")[1];
    console.log({ process: process.env.JWT_SECRET });
    jwt.verify(token, process.env.JWT_SECRET || "dfjdd", (err, decoded: any) => {
        if (err) {
            return res.status(403).send("Invalid token!");
        } else {
            if (decoded.admin) {
                return next();
            }
            return res.status(403).send("Only admin user can create and update products!");
        }
    });
};


