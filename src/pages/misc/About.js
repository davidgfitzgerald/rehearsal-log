import React from 'react'
import {Layout} from '../../layout'
import DFLiveShot from "../../assets/images/DFLiveShot.JPG";

class About extends React.Component {

  render() {
    return (
      <Layout>
        <h1>About</h1>
        <div >
          <img
               src={DFLiveShot} alt="DFLiveShot"/>
        </div>
        <div ><p >Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Blanditiis dolor dolore dolores, enim esse laudantium modi molestiae pariatur quo sit.
          Consectetur delectus ex, labore laudantium recusandae sapiente sed! Fugit, incidunt!</p>
        </div>
      </Layout>)
  }

}

export default About;