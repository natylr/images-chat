import { Request, Response, NextFunction } from "express";
import { checkCategoryExists } from "../../utils/validation/checkCategoryExists";

export const checkCategoryIdExistsMiddleware = async (req: Request, res: Response, next:NextFunction)=>{
    try{
    const { categoryId } = req.body || req.params || req.query; 

    if (!categoryId) {
        return res.status(400).json({ error: 'categoryId is required' });
    }

    const exists = await checkCategoryExists(categoryId)
    if(!exists){
        return res.status(400).json({error: "Category with the provided ID does not exist'"});
    }
   next();
}
catch(error){
    next(error);
}
}