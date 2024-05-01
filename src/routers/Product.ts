import express from 'express';
import { addNewProducts, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product';
import { verifyAdminToken } from '../middleware/auth';
const router = express.Router();

router.get("/admin/product", verifyAdminToken, getProducts);
router.get("/admin/product/:id", verifyAdminToken, getProduct);
router.post("/admin/product", verifyAdminToken, addNewProducts);
router.patch("/admin/product/:id", verifyAdminToken, updateProduct);
router.delete("/admin/product/:id", verifyAdminToken, deleteProduct);

export default router;