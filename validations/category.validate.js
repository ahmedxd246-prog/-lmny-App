import joi from 'joi';

const generalFields = {
    name: joi.string().min(3).max(20).required()
}

//get category by Id
export const getCategory = joi.object({
    id: joi.string().required()
});

//create category
export const createCategory = joi.object({
    ...generalFields
});

//update category
export const updateCategory = joi.object({
    id: joi.string().required(),
    ...generalFields
});

//delete category
export const deleteCategory = joi.object({
    id: joi.string().required()
});
