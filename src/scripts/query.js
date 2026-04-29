const queryScript = {
    getProducts: `SELECT product_id "productId", name "productName", description, price, sku, images, availability, is_active "isActive" FROM product `,

    loginUser: `SELECT u.user_id "userId", u.user_name "userName",u.email ,u.salt,u."password"  FROM users u `,

    getReviews: `SELECT reviews_id "reviewsId", product_id "productId", description , rating
    FROM reviews`
}

export default queryScript;