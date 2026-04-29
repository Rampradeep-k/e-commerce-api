import queryScript from '../scripts/query.js';
import { executeQuery } from '../helpers/db.js';
import fieldMap from '../scripts/table.js';
import bcrypt from 'bcrypt';

async function getProductReviews(reviewData) {

    const conditions = [];
    const values = [];
    let baseQuery = queryScript.getReviews ?? queryScript.getReviews;
    if (reviewData.productId) {
        values.push(reviewData.productId);
        conditions.push(`product_id  = $${values.length}`);
    }
    if (conditions.length) {
        baseQuery += ` WHERE ${conditions.join(" AND ")}`;
    }
    
    const reviews = await executeQuery(baseQuery, values);

    return reviews;
};

const createProductReviews = async (data) => {
  try {
    const fields = [];
    const values = [];
    const placeholders = [];
    const fieldMapping = fieldMap.reviewTable

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
    INSERT INTO reviews (${fields.join(", ")})
    VALUES (${placeholders.join(", ")})
    RETURNING *;
  `;

    const result = await executeQuery(query, values);
    if (result.length) {
      return await getProductReviews({ "reviewId": result[0].review_id })
    }
  } catch (error) {

    if (error.code == 23505) {
      throw new Error("SKU already exists. Please use a different SKU")
    }

    throw error;
  }

};


export default {
    getProductReviews,
    createProductReviews
};


