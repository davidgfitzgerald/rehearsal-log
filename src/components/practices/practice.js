import React from 'react'

class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.key = props.key
    this.data = props.data
  }

  render() {
    let data = this.data

    return (
      <div className="flex m-2 justify-center">
        <ul className="cpractice">
          <li className=" flex m-2">Practice {data["practice_id"]}:</li>
        </ul>
        <ul className="cpractice">
          {Object.keys(data).filter(key => key !== "practice_id").map((k) => {
              return (
                <li className="flex m-2">{k}: {data[k]}</li>
              )
        })}
        </ul>
      </div>
    )


  }
}

export { Practice }