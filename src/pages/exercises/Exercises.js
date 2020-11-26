import React from 'react'
import { Layout } from '../../layout'
import { AllExercises } from "../../components/exercises";

class Exercises extends React.Component {

  render () {
    return (
      <Layout>
        <AllExercises/>
      </Layout>
    )
  }

}

export default Exercises;
