import React from 'react'
import { ENDPOINTS } from '../../utils/globals.json'
import { Exercise } from "./exercise";

const ExercisesURL = ENDPOINTS.EXERCISES.BASE;

class ExerciseIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      exercises: []
    }
  }

  componentDidMount() {
    fetch(ExercisesURL)
      .then(res => res.json())
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            exercises: response

          });
        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, isLoaded, exercises } = this.state;
    let content;

    if (error) {
      content = <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      content = <div>Loading exercises...</div>
    } else if (Object.entries(exercises).length === 0) {
      content = <p>No exercises found.</p>
    } else {
      content = <ul>{
        exercises.map((p, i) => {
          return <Exercise key={i} data={p}/>
        })
      }</ul>
    }

    return (
      <div>
        <h1 className="ctitle">Exercises</h1>
        {content}
      </div>)
  }

}

export { ExerciseIndex }