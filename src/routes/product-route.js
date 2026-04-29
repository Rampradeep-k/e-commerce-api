import express from 'express';
const router = express.Router();
import productService from '../services/product-service.js';
import verifyToken from '../middlewares/auth-middleware.js';
import { successResponse, errorResponse } from '../helpers/response.js';




async function getProducts(req, res) {
  try {
    const products = await productService.getProducts(req.query);

    if (!products.length) {
      return successResponse(res, {
        data: [],
        message: "No products found"
      });
    }

    return successResponse(res, { data: products });

  } catch (err) {

    return errorResponse(res, {
      message: err.message || "Something went wrong",
      code: err.statusCode || 500
    });
  }
}

async function createProducts(req, res) {
  try {
    const products = await productService.createProducts(req.body);
    if (!products.length) {
      return successResponse(res, {
        data: [],
        message: "No products found"
      });
    }

    return successResponse(res, { data: products });

  } catch (err) {
    return errorResponse(res, {
      message: err.message || "Something went wrong",
      code: err.statusCode || 500
    });
  }
}

async function updateProducts(req, res) {
  try {
    const products = await productService.updateProducts(req.params.productId, req.body);

    if (!products.length) {
      return successResponse(res, {
        data: [],
        message: "No products found"
      });
    }

    return successResponse(res, { data: products });


  } catch (err) {
    return errorResponse(res, {
      message: err.message || "Something went wrong",
      code: err.statusCode || 500
    });
  }
}

async function deleteProducts(req, res) {
  try {
    const products = await productService.deleteProducts(req.params.productId, req.body);

    return successResponse(res, { data: products });


  } catch (err) {
    return errorResponse(res, {
      message: err.message || "Something went wrong",
      code: err.statusCode || 500
    });
  }
}

router.get('/products', verifyToken, getProducts);
router.post('/products', verifyToken, createProducts);
router.put('/products/:productId', verifyToken, updateProducts);
router.delete('/products/:productId', verifyToken, deleteProducts);

export default router;