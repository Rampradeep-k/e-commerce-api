import pool from '../helpers/db-connector.js';
import jwt from 'jsonwebtoken';
import queryScript from '../scripts/query.js';
import { executeQuery } from '../helpers/db.js';
import fieldMap from '../scripts/table.js';


const getProducts = async (query = {}) => {
  try {
    let baseQuery = queryScript.getProducts ?? queryScript.getProducts;

    const conditions = [];
    const values = [];

    if (query.productId) {
      values.push(query.productId);
      conditions.push(`product_id = $${values.length}`);
    }

    if (query.name) {
      values.push(`%${query.name}%`);
      conditions.push(`LOWER(name) ILIKE $${values.length}`);
    }

    if (query.minPrice) {
      values.push(query.minPrice);
      conditions.push(`price >= $${values.length}`);
    }

    if (query.maxPrice) {
      values.push(query.maxPrice);
      conditions.push(`price <= $${values.length}`);
    }

    if (query.isActive !== undefined) {
      values.push(query.isActive);
      conditions.push(`is_active = $${values.length}`);
    }

    if (conditions.length) {
      baseQuery += ` WHERE ${conditions.join(" AND ")}`;
    }

    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const offset = (page - 1) * limit;

    values.push(limit);
    baseQuery += ` LIMIT $${values.length}`;

    values.push(offset);
    baseQuery += ` OFFSET $${values.length}`;
console.log(conditions);

    const result = await executeQuery(baseQuery, values);

    return result;

  } catch (err) {
    throw err;
  }
};

const createProducts = async (data) => {
  try {
    const fields = [];
    const values = [];
    const placeholders = [];
    const fieldMapping = fieldMap.productTable

    Object.entries(data).forEach(([key, value]) => {
      const dbField = fieldMapping[key];

      if (dbField && value !== undefined) {
        fields.push(dbField);
        values.push(value);
        placeholders.push(`$${values.length}`);
      }
    });

    if (!fields.length) {
      throw { statusCode: 400, message: "No valid fields provided" };
    }

    const query = `
    INSERT INTO product (${fields.join(", ")})
    VALUES (${placeholders.join(", ")})
    RETURNING *;
  `;

    const result = await executeQuery(query, values);
    if (result.length) {
      return await getProducts({ "productId": result[0].product_id })
    }
  } catch (error) {

    if (error.code == 23505) {
      throw new Error("SKU already exists. Please use a different SKU")
    }

    throw error;
  }

};

const updateProducts = async (id, data) => {
  try {

    const updates = [];
    const values = [];
    const fieldMapping = fieldMap.productTable

    
    Object.entries(data).forEach(([key, value]) => {
      const dbField = fieldMapping[key];

      if (dbField && value !== undefined) {
        values.push(value);
        updates.push(`${dbField} = $${values.length}`);
      }
    });

    if (!updates.length) {
      throw { statusCode: 400, message: "No fields to update" };
    }

    values.push(id);

    const query = `
    UPDATE product
    SET ${updates.join(", ")}
    WHERE product_id = $${values.length}
    RETURNING *;
  `;

    const result = await executeQuery(query, values);
    console.log(result);

    if (result.length) {
      return await getProducts({ "productId": result[0].product_id })
    }

  } catch (error) {
    if (error.code == 23505) {
      throw new Error("SKU already exists. Please use a different SKU")
    }
    throw error;
  }
};

const deleteProducts = async (id, data) => {
  try {

    const query = `
    UPDATE product
    SET is_active = false
    WHERE product_id = ${id}
    RETURNING *;
  `;
    
    const result = await executeQuery(query);

    if (result.length) {
      return true
    }

  } catch (error) {
    if (error.code == 23505) {
      throw new Error("SKU already exists. Please use a different SKU")
    }
    throw error;
  }
};

export default {
  getProducts,
  createProducts,
  updateProducts,
  deleteProducts
};