import React from 'react'
import { Layout } from '../layout'
import Clock from '../components/Clock'
import Toggle from '../components/Toggle'
import PracticeForm from "../components/practice_form";

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