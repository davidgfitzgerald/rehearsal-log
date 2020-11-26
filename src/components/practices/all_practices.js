import React from 'react'
import { ENDPOINTS } from '../../utils/globals.json'
import { Practice } from "./practice";

const PracticesURL = ENDPOINTS.PRACTICES.BASE;

class AllPractices extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      practices: []
    }
  }

  componentDidMount() {
    fetch(PracticesURL)
      .then(res => res.json())
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            practices: response

          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, isLoaded, practices } = this.state;
    let content;

    if (error) {
      content = <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      content = <div>Loading practices...</div>
    } else if (Object.entries(practices).length === 0) {
      content = <p>No practices found.</p>
    } else {
      content = <ul>{
        practices.map((p, i) => {
          return <Practice key={i} data={p}/>
        })
      }</ul>
    }

    return (
      <div>
        <h1 className="ctitle">Practices</h1>
        {content}
      </div>)
  }

}

export { AllPractices }