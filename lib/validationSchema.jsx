import * as yup from "yup";

// Common validation rules
export const emailSchema = yup
  .string()
  .required('Email is required')
  .email('Please enter a valid email address')
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is invalid');

export const passwordSchema = yup
  .string()
  .required('Password is required')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
  `Only allows letters, digits, and special characters, minimum 8 characters`)
  .min(8, 'Password must be at least 8 characters');

export const nameSchema = yup
  .string()
  .required('This field is required')
  .min(2, 'Must be at least 2 characters')
  .max(50, 'Must be less than 50 characters')
  .matches(/^[a-zA-Z\s]*$/, 'Can only contain letters and spaces');

// Complete schemas
export const signUpSchema = yup.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema.min(8, 'Password must be at least 5 characters for sign up'),
});

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});