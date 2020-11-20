import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import { COLOURS } from "../../utils/globals.json";
import * as Yup from 'yup'

const SECONDARY_COLOUR = COLOURS.SECONDARY;
const ERROR_COLOUR = COLOURS.ERROR;

class PracticeForm extends React.Component {

  render() {
    return (
      <Formik initialValues={{ duration: "", instrument: "drums", bpm: "", exercise_id: null}}
              validationSchema={Yup.object({
                duration: Yup.number()
                  .typeError("Must be a number.")
                  .min(1, "Must be greater than zero.")
                  .required("Required."),
                instrument: Yup.string()
                  .typeError("Must only contain letters.")
                  .required("Required."),
                bpm: Yup.number()
                  .typeError("Must be a number.")
                  .min(1, "Must be greater than zero."),
                exercise_id: Yup.number()
                  .typeError("Must be a number")
                  .required("Required.")
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400)

              }}
      >{formik => (<div className="m-10">
        <h1 className="ctitle">New Practice</h1>
        <Form className="cform" onSubmit={formik.handleSubmit}>
          <label htmlFor="duration">Duration</label>
          <Field name="duration" type="text"/>
          <ErrorMessage name="duration"/>
          <label htmlFor="bpm">BPM</label>
          <Field name="bpm" type="text"/>
          <ErrorMessage name="bpm"/>
          <label htmlFor="instrument">Instrument</label>
          <Field name="instrument" type="text"/>
          <ErrorMessage name="instrument"/>
          <label htmlFor="exercise">Exercise</label>
          <Field name="exercise" type="text"/>
          <ErrorMessage name="exercise"/>

          <button className={"cbutton1 bg-" + SECONDARY_COLOUR + "-500 text-white"} type="submit">Submit</button>
        </Form>
      </div>)}
      </Formik>
    )}
}

export { PracticeForm }
