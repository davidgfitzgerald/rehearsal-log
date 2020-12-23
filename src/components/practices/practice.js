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
      <div >
        <ul >
          <li >Practice {data["id"]}:</li>
        </ul>
        <ul >
          {displayColumns.map(({display_name, column}) => {
            if (data[column]) {
                if (column === "rating") {
                    return <li key={column} >{display_name}: {data[column]}/10</li>
                } else {
                    return <li key={column} >{display_name}: {data[column]}</li>
                }
            } else {
              return <li key={column} >{display_name}: None</li>
            }
          })}
        </ul>
      </div>
    )
  }
}

export { Practice }