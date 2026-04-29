import express from 'express';
const router = express.Router();
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: isActive
 *         required: true
 *         schema:
 *           type: boolean
 *         description: list the product not deleted
 *     responses:
 *       200:
 *         description: List of products
 * 
 *   post:
 *     summary: Create product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - sku
 *             properties:
 *               productName:
 *                 type: string
 *                 example: iPhone 15
 *               sku:
 *                 type: string
 *                 example: IP15-001
 *               price:
 *                 type: float
 *                 example: 2000.90
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: SKU must be unique
 * 
 * /products/{productId}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - sku
 *             properties:
 *               productName:
 *                 type: string
 *                 example: iPhone 15
 *               sku:
 *                 type: string
 *                 example: IP15-001
 *     responses:
 *       201:
 *         description: Product updated
 *       400:
 *         description: SKU must be unique
 * 
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to delete
 *     responses:
 *       201:
 *         description: Product deleted 
 * 
 * /product-review:
 *   get:
 *     summary: Get product reviews
 *     tags: [Product Reviews]
 *     parameters:
 *       - in: query
 *         name: ProdcutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product for which to get reviews
 *     responses:
 *       200:
 *         description: List of product reviews
 * 
 *   post:
 *     summary: Create product review
 *     tags: [Product Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - rating
 *             properties:
 *               productId:
 *                 type: number
 *                 example: 1
 *               rating:
 *                 type: number
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: Great product!
 *               
 *     responses:
 *       201:
 *         description: Product Review created
 *      
 * 
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid password
 *       403:
 *         description: User not found
 */
import productRoutes from './product-route.js';
import loginRoutes from './login-route.js';
import reviewRoutes from './review-route.js';

router.use( productRoutes);
router.use( loginRoutes);
router.use( reviewRoutes);

export default router;