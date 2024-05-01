import joi from "joi";

export const registerSchema=joi.object({
    firstName:joi.string().alphanum().min(2).max(20),
    lastName:joi.string().alphanum().min(2).max(20),
    user:joi.string().min(4).max(30),
    email:joi.string().email().exist().required(),
    password:joi.string().min(8).required().trim(),
    confirmPassword:joi.ref("password"),
    phone:joi.string().length(10).required(),
    dateOfBirth:joi.date().required(),

})

export const loginSchema=joi.object({

    email:joi.string().email().exist().required(),
    password:joi.string().min(8).required().trim(),
})

export const productSchema=joi.object({
    
    

})

export const reviewSchema=joi.object({
    
    

})

export const addressSchema=joi.object({
    
    

})