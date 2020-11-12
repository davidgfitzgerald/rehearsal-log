import React from 'react'
import { Layout } from '../layout'
import { PracticeForm } from "../components/practice_form";

class Home extends React.Component {

  render () {
    return (
      <Layout>
        <PracticeForm/>
        {/*<Clock/>*/}
        {/*<Toggle/>*/}
      </Layout>
    )
  }

}

export default Home;