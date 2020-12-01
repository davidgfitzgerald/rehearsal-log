import React from 'react'

const displayColumns = [
    {"column": "duration", "display_name": "Duration"},
    {"column": "bpm", "display_name": "BPM"},
    {"column": "rating", "display_name": "Rating"},
    {"column": "name", "display_name": "Name"},
]

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
          {displayColumns.map(({display_name, column}) => {
            if (data[column]) {
                if (column === "rating") {
                    return <li key={column} className="flex m-2">{display_name}: {data[column]}/10</li>
                } else {
                    return <li key={column} className="flex m-2">{display_name}: {data[column]}</li>
                }
            } else {
              return <li key={column} className="flex m-2">{display_name}: None</li>
            }
          })}
        </ul>
      </div>
    )
  }
}

export { Practice }