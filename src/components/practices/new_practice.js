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

        <Form className="cform flex">
          <div>
            <label htmlFor="duration">Duration</label>
            <Field className="cform m-2" name="duration" type="text"/>
            <ErrorMessage className={"cbutton1 bg-" + ERROR_COLOUR + "-500 text-white"} name="duration"/>
          </div>
          <div>
            <label htmlFor="bpm">BPM</label>
            <Field className="cform m-2" name="bpm" type="text"/>
            <ErrorMessage className={"cbutton1 bg-" + ERROR_COLOUR + "-500 text-white"} name="bpm"/>
          </div>
          <div>
            <label htmlFor="instrument">Instrument</label>
            <Field className="cform m-2" name="instrument" type="text"/>
            <ErrorMessage className={"cbutton1 bg-" + ERROR_COLOUR + "-500 text-white"} name="instrument"/>
          </div>
          <div>
            <label htmlFor="exercise">Exercise</label>
            <Field className="cform m-2" name="exercise" type="text"/>
            <ErrorMessage className={"cbutton1 bg-" + ERROR_COLOUR + "-500 text-white"}  name="exercise"/>
          </div>

          <button className={"cbutton1 bg-" + SECONDARY_COLOUR + "-500 text-white"} type="submit">Submit</button>
        </Form>
      </div>)}
      </Formik>
    )}
}

export { PracticeForm }
