import React from 'react'
import { ENDPOINTS } from '../../utils/globals.json'
import { Practice } from "./practice";

const GETPractices = ENDPOINTS.PRACTICES.BASE;

class PracticeIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      practices: []
    }
  }

  componentDidMount() {
    fetch(GETPractices)
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
    let practices = this.state.practices;
    let content;

    if (Object.entries(practices).length === 0) {
      content = <p>No practices found.</p>
    } else {
      content = <ul>{
        practices.map((p, i) => {
          return <Practice key={i} data={p}/>
        })
      }</ul>
    }

    return (<div>
      <h1 className="ctitle">Practices</h1>
      {content}
    </div>)
  }

}

export { PracticeIndex }