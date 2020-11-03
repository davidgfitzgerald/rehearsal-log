import React from 'react'
import {Layout} from '../layout'
import DFLiveShot from "../assets/images/DFLiveShot.JPG";

const About = () => (
  <Layout>
    <div className="p-5 flex justify-center">
      <h1 className="mt-4 text-2xl text-gray-900 font-bold">Homepage Title</h1>
    </div>
    <div className="mt-4 flex justify-center">
      <img className="max-w-lg object-cover rounded-3xl shadow-2xl"
           src={DFLiveShot} alt="DFLiveShot"/>
    </div>
    <div className="p-5 flex justify-center"><p className="mt-4 text-gray-700">Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Blanditiis dolor dolore dolores, enim esse laudantium modi molestiae pariatur quo sit.
      Consectetur delectus ex, labore laudantium recusandae sapiente sed! Fugit, incidunt!</p>
    </div>
  </Layout>
)

export default About;