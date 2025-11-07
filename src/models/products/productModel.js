import Product from "./productSchema.js";

export const addProduct = (productObj) => {
  return Product.create(productObj);
};

export const getAllProductsQuery = () => {
  return Product.find().sort({ createdAt: -1 });
};
export const getProductsByFilter = (filter) => {
  return Product.find(filter);
};

export const getProductsById = (id) => {
  return Product.findById(id);
};

export const updateProductQuery = (id, updateObj) => {
  return Product.findByIdAndUpdate(id, updateObj, { new: true });
};

export const deleteProductQuery = (id) => {
  return Product.findByIdAndDelete(id);
};
