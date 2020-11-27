import React from 'react'
import { Layout } from '../../layout'
import { AllExercises } from "../../components/exercises";
import LoginButton from "../../components/auth/LoginButton";

class Exercises extends React.Component {

  render () {
    return (
      <Layout>
        <LoginButton/>
        <AllExercises/>
      </Layout>
    )
  }

}

export default Exercises;
