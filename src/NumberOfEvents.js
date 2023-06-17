import React, { Component } from "react";
import { ErrorAlert } from "./Alert";
import "./styles.css";

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ eventCount: value });

    if (value > 32 || value < 0) {
      this.setState({
        eventCount: value,
        infoText: "Please enter a number between 1-32",
      });
    } else {
      this.setState({
        infoText: "",
      });
    }
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
          max=""
        />

        <button
          className="update-btn"
          onClick={() => this.props.updateEvents(undefined, eventCount)}
        >
          Update
        </button>
        <div className="error">
          <ErrorAlert text={this.state.infoText} />
        </div>
      </div>
    );
  }
}

export default NumberOfEvents;
