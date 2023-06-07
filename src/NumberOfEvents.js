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
      <div className="NumberOfEvents">
        <label htmlFor="event-number-input">Number of Events:</label>
        <input
          type="number"
          className="number"
          value={this.state.eventCount}
          onChange={this.handleInputChanged}
          id="event-number-input"
          max="32"
        />
        <button onClick={() => this.props.updateEvents(undefined, eventCount)}>
          Update
        </button>
      </div>
    );
  }
}

export default NumberOfEvents;
