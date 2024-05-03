import joi from "joi";

export const registerSchema = joi.object({
  firstName: joi.string().alphanum().min(2).max(20),
  lastName: joi.string().alphanum().min(2).max(20),
  user: joi.string().min(4).max(30),
  email: joi.string().email().exist().required(),
  password: joi.string().min(8).required().trim(),
  confirmPassword: joi.ref("password"),
  phone: joi.string().length(10).required(),
  dateOfBirth: joi.date().required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().exist().required(),
  password: joi.string().min(8).required().trim(),
});

export const productSchema = joi.object({
  title: joi.string().min(2).max(30).required(),
  longSubtitle: joi.string().min(2).max(300).required(),
  shortSubtitle: joi.string().min(2).max(60).required(),
  description: joi.string().min(2).max(1500),
  price: joi.number().positive().precision(2).required(),
  quantity: joi.number().min(1).required(),
  discountPercentage: joi.number().min(0).max(95),
});

export const reviewSchema = joi.object({
  rating: joi.number().positive().precision(2).min(1).max(5).required(),
  content: joi.string().min(0).max(1500),
});

export const addressSchema = joi.object({
  fullName: joi.string().min(2).max(100).required(),
  pinCode: joi.string().min(4).max(10).required(),
  city: joi.string().min(2).max(50).required(),
  state: joi.string().min(2).max(50).required(),
  streetAddress: joi.string().min(2).max(100).required(),
  mobileNumber: joi.string().length(10).required(),
});
