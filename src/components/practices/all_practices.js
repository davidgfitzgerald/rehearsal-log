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

  render() {
    const { error, practicesLoaded, practices } = this.state;
    const createdPractice = this.props.createdPractice;
    let content;

    if (error) {
      content = <div>Error: {error.message}</div>
    } else if (!practicesLoaded) {
      content = <div>Loading practices...</div>
    } else if (Object.entries(practices).concat(createdPractice).length === 0) {
      content = <p>No practices found.</p>
    } else {
      content = <ul>{
        practices.concat(createdPractice).map((p, i) => {
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