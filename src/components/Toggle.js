import React from 'react'
import {APP_COLOUR_2} from "../utils/globals.json";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // binding
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button className={"inline-block px-5 py-3 shadow-2xl rounded-md " +
      "bg-"+APP_COLOUR_2+"-500 text-white text-md font-semibold tracking-wide"}
              onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}

export default Toggle;