import pool from '../helpers/db-connector.js';
import jwt from 'jsonwebtoken';
import queryScript from '../scripts/query.js';
import { executeQuery } from '../helpers/db.js';
import fieldMap from '../scripts/table.js';
import bcrypt from 'bcrypt';

async function loginUser(loginData) {

    const conditions = [];
    const values = [];
    let baseQuery = queryScript.loginUser
    if (loginData.email) {
        values.push(loginData.email);
        conditions.push(`email = $${values.length}`);
    }
    if (conditions.length) {
        baseQuery += ` WHERE ${conditions.join(" AND ")}`;
    }
    const result = await executeQuery(baseQuery, values);

    if (!result.length) {
        throw { status: 403, message: 'User not found' };
    }

    const user = result;
    
    const isMatch = await bcrypt.compare(loginData.password, user[0].password);

    if (!isMatch) {
        throw { status: 400, message: 'Incorrect password' };
    }

    const token = jwt.sign(
        { userId: user.user_id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );

    delete user[0].password;
    delete user[0].salt;

    return { user, token };
};

export default {
    loginUser
};


/* const password = "123456";
const saltRounds = 10; // usually 10–12 is safe

const hashPassword = async () => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    console.log("Salt:", salt);
    console.log("Hash:", hash);
};

hashPassword(); */
