import React, { Component } from "react";


class NumberOfEvents extends Component {
  
  state = {
    eventCount: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ eventCount: value });
  };

  render() {
    const { eventCount } = this.state;
    return (
      <div className="numberOfEvents">
        <label htmlFor="event-number-input">Number of Events:</label>
        <input
          type="number"
          className="number"
          value={this.state.eventCount}
          onChange={this.handleInputChanged}
          id="numberOfEvents__input"
          max="32"
        />
        <button
          className="update-btn"
          onClick={() => this.props.updateEvents(undefined, eventCount)}
        >
          Update
        </button>
      </div>
    );
  }
}

export default NumberOfEvents;
