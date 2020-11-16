import React from 'react'
import { Layout } from '../../layout'
import { PracticeForm, PracticeIndex } from "../../components/practices";

class Home extends React.Component {

  render () {
    return (
      <Layout>
        <PracticeIndex/>
        <PracticeForm/>
        {/*<Clock/>*/}
        {/*<Toggle/>*/}
      </Layout>
    )
  }

}

export default Home;