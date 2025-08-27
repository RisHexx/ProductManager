import express from 'express';
import {
   getProducts, 
   createProduct,
   getProduct,
   updateProduct,
   deleteProduct
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;