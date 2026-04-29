const fieldMap = {
    productTable: {
        "productId": "product_id",
        "productName": "name",
        "description": "description",
        "price": "price",
        "sku": "sku",
        "images": "images",
        "availability": "availability",
        "isActive": "is_active",
        "createdOn": "created_on",
        "updatedOn": "updated_on",
    },
    reviewTable: {
        "reviewId": "review_id",
        "productId": "product_id",
        "rating": "rating",
        "description": "description",
        "isActive": "is_active",
        "createdOn": "created_on",
        "updatedOn": "updated_on",
    }
}
export default fieldMap;