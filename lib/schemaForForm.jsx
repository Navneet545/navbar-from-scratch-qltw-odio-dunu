// validationSchema.js
import * as yup from "yup";

export const donationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  pin: yup
    .string()
    .matches(/^\d{6}$/, "Pin code must be 6 digits")
    .required("Pin code is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  date: yup.date().required("Date is required"),
  gender: yup.string().required("Gender is required"),
  donationSchemes: yup
    .array()
    .min(1, "Select at least one donation scheme"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
