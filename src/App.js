import React, { Component } from "react";

import EventList from "./EventList";
import CitySearch from "./CitySearch";
import { getEvents, extractLocations } from "./api";
import NumberOfEvents from "./NumberOfEvents";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Container, Row, Col } from "react-bootstrap";

class App extends Component {
  _isMounted = false;
  state = {
    events: [],
    allEvents: [],
    locations: [],
    numberOfEvents: 32,
  };

  async componentDidMount() {
    this._isMounted = true;
    const events = await getEvents();
    // console.log("Fetched events: ", events);
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
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  getEventTechnologies = () => {
    const { allEvents } = this.state;
    const terms = ["React", "JavaScript", "Angular", "Node", "Jquery"];
    const termCounts = this.calculateTermCounts(allEvents, terms);

    const data = terms.map((term) => ({ name: term, value: termCounts[term] }));

    return data;
  };

  calculateTermCounts = (events, terms) => {
    const termCount = terms.reduce((acc, term) => ({ ...acc, [term]: 0 }), {});

    events.forEach((event) => {
      terms.forEach((term) => {
        if (event.summary.toLowerCase().includes(term.toLowerCase())) {
          termCount[term]++;
        }
      });
    });

    return termCount;
  };

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
    const eventTechnologyData = this.getEventTechnologies();
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
        <h4>Events in each city</h4>
        <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="" data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>

        <ResponsiveContainer height={400}>
          <PieChart width={800}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={eventTechnologyData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
            >
              {eventTechnologyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  // fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <EventList events={events} />
      </div>
    );
  }
}

export default App;
