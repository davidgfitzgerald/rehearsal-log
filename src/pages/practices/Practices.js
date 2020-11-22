import React from 'react'
import { Layout } from '../../layout'
import { PracticeForm, PracticeIndex } from "../../components/practices";

class Practices extends React.Component {

  render () {
    return (
      <Layout>
        <PracticeForm/>
        <PracticeIndex/>
      </Layout>
    )
  }

}

export default Practices;
