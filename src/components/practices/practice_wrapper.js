import React from 'react'
import { PracticeForm } from "./new_practice";
import { AllPractices } from "./all_practices";

// Allows a created practice to be loaded into AllPractices
class PracticeWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createdPractice: [],
      allPracticesLoaded: false
    };

    // binding
    this.setCreatedPractice = this.setCreatedPractice.bind(this);
  }

  setCreatedPractice (practice) {
    this.setState({
      createdPractice: [practice]
    })
  };

  render() {
    const createdPractice = this.state.createdPractice

    return (
      <div>
      <PracticeForm setCreatedPractice={this.setCreatedPractice}/>
      <AllPractices createdPractice={createdPractice}/>
    </div>
    )
  }
}

export { PracticeWrapper }