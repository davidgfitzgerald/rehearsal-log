import React from 'react'
import { Layout } from '../../layout'
import { AllExercises } from "../../components/exercises";
import LoginButton from "../../components/auth/LoginButton";
import TestForm from "../../components/testForm";

class Exercises extends React.Component {

  render () {
    return (
      <Layout>
        <LoginButton/>
        <AllExercises/>
        <TestForm/>
      </Layout>
    )
  }

}

export default Exercises;
