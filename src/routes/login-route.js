import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/auth-middleware.js';
import { successResponse, errorResponse } from '../helpers/response.js';
import loginService from '../services/login-service.js';


async function loginUser(req, res) {
    try {

        const result = await loginService.loginUser(req.body);

        res.setHeader('token', result.token);
        delete result.token
        console.log(result.user);

        return successResponse(res, { data: result.user ? result.user : [] });


    } catch (err) {
        return errorResponse(res, {
            message: err.message || "Something went wrong",
            code: err.statusCode || 500
        });
    }
}

router.post('/login', loginUser);

export default router;