import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import { getEvents, extractLocations } from "./api";
import "./styles.css";

class App extends Component {
  _isMounted = false;
  state = {
    events: [],
    locations: [],
  };

  async componentDidMount() {
    this._isMounted = true;
    const events = await getEvents();
    if (this._isMounted) {
      this.setState({ events, locations: extractLocations(events) });
    }
  }

  componentWillUnmount() {
    this._isMounted = false; 
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
