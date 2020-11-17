import React from 'react'

class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.key = props.key
    this.data = props.data
  }

  render() {
    let key = this.key;
    let data = this.data;
    return <li className="cpractice" key={key}>{JSON.stringify(data)}</li>
  }
}

export { Practice }