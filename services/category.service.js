
import Category from "../models/category.model.js";
import catchAsync from "../utils/catchAsync.util.js";
import AppError from "../utils/appError.util.js";

//get all categories
export const getAllCategories = () => {
    return Category.findAll();
};

//get category by id
export const getCategoryById = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) {
        throw new AppError('Category not found', 404);
    }
    return category;
};

//create category
export const createCategory = (name) => {
    return Category.create({ name: name.toLowerCase() });
};

//update category
export const updateCategory = async (id, name) => {
    const category = await getCategoryById(id);
    return category.update({ name: name.toLowerCase() });
};

//destroy category
export const deleteCategory = async (id) => {
    const category = await getCategoryById(id);
    await category.destroy();
    return true;
};