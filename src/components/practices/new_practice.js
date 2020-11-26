import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import { COLOURS, ENDPOINTS } from "../../utils/globals.json";
import * as Yup from 'yup'

const ExercisesURL = ENDPOINTS.EXERCISES.BASE;
const PracticesURL = ENDPOINTS.PRACTICES.BASE;
const SECONDARY_COLOUR = COLOURS.SECONDARY;
const ERROR_COLOUR = COLOURS.ERROR;

class PracticeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      exercisesLoaded: false,
      exercises: []
    }
  }
  //
  componentDidMount() {
    fetch(ExercisesURL)
      .then(res => res.json())
      .then(
        (response) => {
          console.log("Exercises Loaded.")
          this.setState({
            exercisesLoaded: true,
            exercises: response

          });
        },
        (error) => {
          console.log(error)
          this.setState({
            exercisesLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const exercisesLoaded = this.state.exercisesLoaded;
    const exercises = this.state.exercises;
    const initialValues = { duration: "", bpm: "", exercise_id: 1, rating: ""}
    const validationSchema = Yup.object({
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
    })  // TODO move validations to dedicated directory

    const onSubmit = (values, { resetForm }) => {
      setTimeout(() => {
          fetch(PracticesURL, {
            method: "POST",
            body: JSON.stringify(values, null, 2)
          })
            .then(res => res.json())
            .then(
              (response) => {
                // Give the parent (PracticeWrapper) the created practice
                this.props.setCreatedPractice(response)
              },
              (error) => {
                console.log(error)
                alert(error)
                // TODO Error handling
              },
              resetForm()
            )
        }, 400
      )
    }

    return (
      <Formik initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
        {({ errors, values, touched, setValues }) =>(
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
                <label htmlFor="rating">Rating</label>
                <Field className="cform flex m-2" name="rating" type="text"/>
                <ErrorMessage className={"cbutton1 bg-" + ERROR_COLOUR + "-500 text-white"} component="div" name="rating"/>
              </div>
              <div>
                <label htmlFor="exercise_id">Exercise</label>
                <Field className="cform flex m-2" name="exercise_id" type="text">
                  {({ field }) => (
                    <select {...field}
                            className={'form-control' + (errors.numberOfTickets && touched.numberOfTickets ? ' is-invalid' : '')}>
                      <option value="1">1</option>

                    {/*  if (exercisesLoaded) {  // TODO dynamic options.*/}
                    {/*  exercises.map((ex, i) => {*/}
                    {/*    return <option key={i} value={ex.id}>{ex.id}</option>*/}
                    {/*  })*/}
                    {/*} else {*/}
                    {/*  <option value="1">1</option>*/}
                    {/*}*/}
                    </select>)}
                </Field>
              </div>

              <button className={"cbutton1 bg-" + SECONDARY_COLOUR + "-500 text-white flex"} type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    )
  }
}

export { PracticeForm }
