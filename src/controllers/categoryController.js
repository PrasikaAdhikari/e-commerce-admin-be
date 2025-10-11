import {
  deleteCategoryQuery,
  findByFilter,
  getAllCategories,
  insertCategory,
  updateCategoryQuery,
} from "../models/categories/categoryModel.js";

export const fetchAllCategories = async (req, res, next) => {
  try {
    let allCategories = await findByFilter();

    const categories = allCategories.filter(
      (category) => category.parent === null
    );
    const subCategories = allCategories.filter(
      (category) => category.parent !== null
    );

    return res.json({
      status: "success",
      message: "All categories fetched successfully",
      categories,
      subCategories,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Failed fetching all categories",
    });
  }
};

export const createCategory = async (req, res, next) => {
  try {
    let categoryObj = req.body;
    if (categoryObj.parent === "null" || categoryObj.parent === "") {
      categoryObj.parent = null;
    }
    console.log(222, categoryObj);
    let addCategory = await insertCategory(categoryObj);

    return res.json({
      status: "success",
      message: "Category created successfully",
      data: addCategory,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Failed creating category",
    });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await deleteCategoryQuery(id);
    return res.json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Failed deleting category",
    });
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await updateCategoryQuery(id, payload);
    return res.json({
      status: "success",
      message: "Category updated successfully",
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Failed updating category",
    });
  }
};
