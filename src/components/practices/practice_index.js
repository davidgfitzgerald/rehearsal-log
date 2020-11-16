import React from 'react'

class PracticeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      practices: [
        // {"test": "practice"}
      ]
    }
  }
  componentDidMount() {

  }

  render() {
    let practices = this.state.practices;
    let content;

    if (Object.entries(practices).length === 0) {
      content = <p>No practices found.</p>
    } else {
      content = <ul>{
        practices.map((p) => {
          return <li>{p.test}</li>
        })
      }</ul>
    }
    return (<div>
      <h1 className="ctitle">Practices</h1>
      {content}
    </div>)
  }

}

export default PracticeIndex