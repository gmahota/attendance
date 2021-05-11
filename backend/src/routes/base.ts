import { Router } from "express";
  
  import {
    get_all_products,
    get_product,
    create_product
  } from "../controllers/base/productController";


import authMiddleware from "../middlewares/auth";

const baseRouter = Router();

  
baseRouter.get("/products", get_all_products)
baseRouter.get("/products/:id", get_product)
baseRouter.post("/products/",create_product)

//Change my password
//router.post("/change-password", [checkJwt], AuthController.changePassword);

export default baseRouter;