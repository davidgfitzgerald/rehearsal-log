import React, { Fragment } from 'react'
import { Layout } from '../../layout'
import { AllExercises } from "../../components/exercises";
import LoginButton from "../../components/auth/LoginButton";
import LogoutButton from "../../components/auth/LogoutButton";
import Profile from "../../components/user/profile";
import { useAuth0 } from "@auth0/auth0-react";

function Exercises() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading ...</div>

    return (
      <Layout>
        <Fragment>
          <LoginButton/>
          <LogoutButton/>
          <Profile/>
        </Fragment>
        <AllExercises/>
      </Layout>
    )

}

export default Exercises;
