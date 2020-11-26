import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";

class TestForm extends Component {
  render() {
    return (
      <div>
        <Formik initialValues={{ duration: "", bpm: "", exercise_id: 1, rating: ""}}
                >
          {({ errors, values, touched, setValues }) =>(
            <Form>
              <div className="form-group">
                <label>Number of Tickets</label>
                <Field name="numberOfTickets">
                  {({ field }) => (
                    <select {...field} className={'form-control' + (errors.numberOfTickets && touched.numberOfTickets ? ' is-invalid' : '')}>
                      <option value="0">0</option>
                      {[1,2,3,4,5,6,7,8,9,10].map(i =>
                        <option key={i} value={i}>{i}</option>
                      )}
                    </select>
                  )}
                </Field>
                <ErrorMessage name="numberOfTickets" component="div" className="invalid-feedback" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default TestForm;