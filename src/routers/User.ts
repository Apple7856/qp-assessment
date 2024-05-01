import express from 'express';
import { createUser, deleteUser, getUser, getUsers, loginUser } from '../controllers/user';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get("/user", verifyToken, getUsers);
router.post("/login", loginUser);
router.get("/user/:id", verifyToken, getUser);
router.post("/user", createUser);
router.delete("/user/:id", verifyToken, deleteUser);

export default router;