import React from 'react'
import { Layout } from '../../layout'
import { ExerciseIndex } from "../../components/exercises";

class Exercises extends React.Component {

  render () {
    return (
      <Layout>
        <ExerciseIndex/>
      </Layout>
    )
  }

}

export default Exercises;
