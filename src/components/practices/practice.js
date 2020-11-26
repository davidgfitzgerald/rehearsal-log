import React from 'react'

class Practice extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data
  }

  render() {
    let data = this.data
    return (
      <div className="flex justify-center">
        <ul className="cpractice">
          <li className=" flex m-2">Practice {data["id"]}:</li>
        </ul>
        <ul className="cpractice">
          {Object.keys(data).filter(hashKey => hashKey !== "id").map((k) => {
            if (data[k]) {
              return <li key={k} className="flex m-2">{k}: {data[k]}</li>
            } else {
              return <li key={k} className="flex m-2">{k}: None</li>
            }
          })}
        </ul>
      </div>
    )
  }
}

export { Practice }