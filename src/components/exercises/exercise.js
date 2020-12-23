import React from 'react'

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.key = props.key
    this.data = props.data
  }

  render() {
    let data = this.data

    return (
      <div>
        <ul>
          <li>Exercise {data["id"]}:</li>
        </ul>
        <ul>
          {Object.keys(data).filter(key => key !== "id").map((k) => {
            return (
              <li key={k}>{k}: {data[k]}</li>
            )
          })}
        </ul>
      </div>
    )


  }
}

export { Exercise }