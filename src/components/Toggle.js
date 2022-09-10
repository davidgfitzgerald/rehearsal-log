import React from 'react'
import COLOURS from "../utils/globals.json";

const SECONDARY_COLOUR = COLOURS.SECONDARY

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
      <button className={"cbutton1 bg-"+SECONDARY_COLOUR+"-500 text-white"}
              onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}

export default Toggle;