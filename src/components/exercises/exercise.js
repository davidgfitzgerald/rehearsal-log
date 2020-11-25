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
      <div className="flex justify-center">
        <ul className="cexercise">
          <li className=" flex m-2">Exercise {data["id"]}:</li>
        </ul>
        <ul className="cexercise">
          {Object.keys(data).filter(key => key !== "id").map((k) => {
            return (
              <li key={k} className="flex m-2">{k}: {data[k]}</li>
            )
          })}
        </ul>
      </div>
    )


  }
}

export { Exercise }