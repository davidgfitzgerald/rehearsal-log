import * as Yup from "yup";

const practiceValidation = Yup.object({
  duration: Yup.number()
    .typeError("Must be a number.")
    .min(1, "Must be greater than zero.")
    .required("Required."),
  bpm: Yup.number()
    .typeError("Must be a number.")
    .min(1, "Must be greater than zero."),
  rating: Yup.number()
    .typeError("Must be a number.")
    .min(0, "Must be between 0-10.")
    .max(10, "Must be between 0-10.")
})

export { practiceValidation }