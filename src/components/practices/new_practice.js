import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import { COLOURS, ENDPOINTS } from "../../utils/globals.json";
import { practiceValidation } from "../../validations/validations";

const ExercisesURL = ENDPOINTS.EXERCISES.BASE;
const PracticesURL = ENDPOINTS.PRACTICES.BASE;
const SECONDARY_COLOUR = COLOURS.SECONDARY;
const ERROR_COLOUR = COLOURS.ERROR;

const initialValues = { duration: "", bpm: "", exercise_id: 1, rating: ""}


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

  exerciseOptions () {
    if (this.state.exercisesLoaded) {
      return this.state.exercises.map((ex, i) => {
        console.log(ex)
        return <option key={i} value={ex.id}>{ex.id}: {ex.name}</option>
      })
    } else {
      return <option value="NoExercises">No Exercises</option>
    }
  }

  onSubmit = (values, { resetForm }) => {
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

  render() {
    return (
      <div>
        <Formik initialValues={initialValues}
                validationSchema={practiceValidation}
                onSubmit={this.onSubmit}>
          {({errors, values, touched, setValues}) => (
            <Form>
              <h1>New Practice</h1>
              <div>
                <div>
                  <label htmlFor="duration">Duration</label>
                  <Field name="duration" type="text"/>
                  <ErrorMessage  component="div"
                                name="duration"/>
                </div>
                <div>
                  <label htmlFor="bpm">BPM</label>
                  <Field name="bpm" type="text"/>
                  <ErrorMessage component="div" name="bpm"/>
                </div>
                <div>
                  <label htmlFor="rating">Rating</label>
                  <Field name="rating" type="text" placeholder="/10"/>
                  <ErrorMessage  component="div"
                                name="rating"/>
                </div>
                <div>
                  <label htmlFor="exercise_id">Exercise</label>
                  <Field  name="exercise_id" type="text">
                    {({field}) => (
                      <select {...field}
                              className={ + (errors.exercise_id && touched.exercise_id ? ' is-invalid' : '')}>
                        {this.exerciseOptions()}
                      </select>
                    )}
                  </Field>
                </div>
                <div >
                  <button  type="submit">Log It
                  </button>
                </div>
              </div>
            </Form>


          )}
        </Formik></div>

    )
  }
}

export { PracticeForm }
