import React from 'react'

class PracticeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: "",
      instrument: "",
      bpm: "",
      exercise_id: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    console.log(name)
    console.log(value)

    this.setState({[name]: value})
  }

  render() {
    const labels = [
      {displayText: "Duration:", name: "duration"},
      {displayText: "BPM:", name: "bpm"},
      ];

    return (
      <div>
        <h1 className="ctitle1">New Practice</h1>
        <form className="p-5 flex border-2 border-gray-400">
          {labels.map((l) => {
            return (
              <label className="m-2">{l.displayText}
                <input className="m-1 border-2" value={this.state[l.name]} type="text" name={l.name} onChange={this.handleChange}/>
              </label>
            )
          })}
          <select className="m-2" name="instrument" value={this.state.instrument} onChange={this.handleChange}>
            <option value="drums">Drums</option>
            <option value="guitar">Guitar</option>
          </select>

          <select placeholder="Exercise ID" className="m-2" name="exercise_id" value={this.state.exercise_id} onChange={this.handleChange}>
            <option>Exercise ID</option>
            {[1,2,3].map((i) => {
              return (
                <option value={i}>{i}</option>
              )
            })}
          </select>
          <input type="submit" value="Submit"/>
        </form>
      </div>

    )
  }

}

export default PracticeForm