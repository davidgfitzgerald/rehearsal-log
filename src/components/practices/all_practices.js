import React from 'react'
import { ENDPOINTS } from '../../utils/globals.json'
import { Practice } from "./practice";

const PracticesURL = ENDPOINTS.PRACTICES.BASE;

class AllPractices extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      practicesLoaded: false,
      practices: [],
      createdPractice: [],
    }
  }

  componentDidMount() {
    fetch(PracticesURL)
      .then(res => res.json())
      .then(
        (response) => {
          this.setState({
            practicesLoaded: true,
            practices: response

          });
        },
        (error) => {
          this.setState({
            practicesLoaded: true,
            error
          })
        }
      )
  }

  content () {
    let { error, practicesLoaded, practices } = this.state;
    let createdPractice = this.props.createdPractice;

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!practicesLoaded) {
      return <div>Loading practices...</div>
    } else if (Object.entries(practices).concat(createdPractice).length === 0) {
      return <p>No practices found.</p>
    } else {
      return <ul>{
        practices.concat(createdPractice).map((p, i) => {
          return <Practice key={i} data={p}/>
        })
      }</ul>
    }
  }

  render() {
    return (
      <div>
        <h1 className="ctitle">Practices</h1>
        {this.content()}
      </div>)
  }

}

export { AllPractices }