import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import { getEvents, extractLocations } from "./api";
import NumberOfEvents from "./NumberOfEvents";
import "./styles.css";

class App extends Component {
  _isMounted = false;
  state = {
    events: [],
    allEvents: [], // New state variable to hold all events
    locations: [],
    numberOfEvents: 32,
  };

  async componentDidMount() {
    this._isMounted = true;
    const events = await getEvents();
    console.log("Fetched events: ", events);
    if (this._isMounted) {
      this.setState({
        events: events.slice(0, this.state.numberOfEvents),
        allEvents: events,
        locations: extractLocations(events),
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateEvents = (location = "all", eventCount) => {
    const { allEvents } = this.state;
    const locationEvents =
      location === "all"
        ? allEvents
        : allEvents.filter((event) => event.location === location);
    this.setState({
      events: locationEvents.slice(0, eventCount),
      numberOfEvents: eventCount,
    });
  };

  updateEventCount = (eventCount) => {
    const { events } = this.state;
    this.setState({
      events: events.slice(0, eventCount),
      numberOfEvents: eventCount,
    });
  };

  render() {
    const { numberOfEvents, locations, events } = this.state;
    return (
      <div className="App">
        <CitySearch
          locations={locations}
          updateEvents={this.updateEvents}
          numberOfEvents={numberOfEvents}
        />
        <NumberOfEvents
          eventCount={numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <EventList events={events} />
      </div>
    );
  }
}

export default App;
