import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/auth-middleware.js';
import { successResponse, errorResponse } from '../helpers/response.js';
import reviewService from '../services/review-service.js';


async function getProductReviews(req, res) {
    try {

        const result = await reviewService.getProductReviews(req.query);
        return successResponse(res, { data: result });


    } catch (err) {
        return errorResponse(res, {
            message: err.message || "Something went wrong",
            code: err.statusCode || 500
        });
    }
}

async function createProductReviews(req, res) {
  try {
    const reviews = await reviewService.createProductReviews(req.body);
    if (!reviews.length) {
      return successResponse(res, {
        data: [],
        message: "No products found"
      });
    }

    return successResponse(res, { data: reviews });

  } catch (err) {
    return errorResponse(res, {
      message: err.message || "Something went wrong",
      code: err.statusCode || 500
    });
  }
}

router.get('/product-review', verifyToken, getProductReviews);
router.post('/product-review', verifyToken, createProductReviews);

export default router;