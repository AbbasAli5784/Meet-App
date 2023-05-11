import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false,
  };
  handleShowHideButton = () => [
    this.setState((prevState) => ({ showDetails: !prevState.showDetails })),
  ];
  render() {
    const { event } = this.props;
    return (
      <div className="Event">
        <h1>{event.summary}</h1>
        {this.state.showDetails && (
          <div className="event-details">
            <p>{event.description}</p>
            <p>{event.location}</p>
          </div>
        )}
        <button onClick={this.handleShowHideButton}>
          {this.state.showDetails ? 'Hide details' : "Show details"}
        </button>
      </div>
    );
  }
}
export default Event;
