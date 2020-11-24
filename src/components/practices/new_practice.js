import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import {COLOURS, ENDPOINTS} from "../../utils/globals.json";
import * as Yup from 'yup'

const POSTPractice = ENDPOINTS.PRACTICES.BASE;


const SECONDARY_COLOUR = COLOURS.SECONDARY;
const ERROR_COLOUR = COLOURS.ERROR;

class PracticeForm extends React.Component {

  render() {
    const initialValues = { duration: "", bpm: "", exercise_id: 1}
    const validationSchema = Yup.object({
      duration: Yup.number()
        .typeError("Must be a number.")
        .min(1, "Must be greater than zero.")
        .required("Required."),
      bpm: Yup.number()
        .typeError("Must be a number.")
        .min(1, "Must be greater than zero."),
    })

    const onSubmit = (values) => {
      setTimeout(() => {
          fetch(POSTPractice, {
            method: "POST",
            body: JSON.stringify(values, null, 2)
          })
            .then(res => res.json())
            .then(
              (response) => {
                alert(JSON.stringify(response))
                this.setState({
                  isLoaded: true,
                  practices: response

                });
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                })
              }
            )
        }, 400
      )
    }

    return (
      <Formik initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
        <Form>
          <h1 className="ctitle">New Practice</h1>
          <div className="cform flex">
            <div>
              <label htmlFor="duration">Duration</label>
              <Field className="cform flex m-2" name="duration" type="text"/>
              <ErrorMessage className={"cbutton1 bg-" + ERROR_COLOUR + "-500 text-white"} component="div"
                            name="duration"/>
            </div>
            <div>
              <label htmlFor="bpm">BPM</label>
              <Field className="cform flex m-2" name="bpm" type="text"/>
              <ErrorMessage className={"cbutton1 bg-" + ERROR_COLOUR + "-500 text-white"} component="div" name="bpm"/>
            </div>
            <div>
              <label htmlFor="exercise_id">Exercise</label>
              <Field as="select" className="cform flex m-2" name="exercise_id" type="text">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Field>
            </div>

            <button className={"cbutton1 bg-" + SECONDARY_COLOUR + "-500 text-white flex"} type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    )
  }
}

export { PracticeForm }
