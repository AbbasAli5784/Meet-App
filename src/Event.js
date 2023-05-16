import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false,
  };
  handleShowHideButton = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };
  render() {
    const { event } = this.props;
    return (
      <div className="Event">
        <h1 className="summary">{event.summary}</h1>
        {this.state.showDetails && (
          <div className="event-details">
            <p>{event.description}</p>
            <p className="location">{event.location}</p>
            <p className="date-time">
              {event.start.dateTime} ({event.start.timeZone})
            </p>
          </div>
        )}
        <button className="details-btn" onClick={this.handleShowHideButton}>
          {this.state.showDetails ? "Hide details" : "Show details"}
        </button>
      </div>
    );
  }
}
export default Event;
