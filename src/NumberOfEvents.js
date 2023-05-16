import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ eventCount: value }, () => {
      this.props.updateEvents(this.state.eventCount);
    });
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label htmlFor="event-number-input">Number of Events:</label>
        <input
          type="number"
          className="number"
          value={this.state.eventCount}
          onChange={this.handleInputChanged}
          id="event-number-input"
        />
      </div>
    );
  }
}

export default NumberOfEvents;
