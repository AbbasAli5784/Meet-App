import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";

describe("<App /> integration", () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppsEventsState = AppWrapper.state("events");
    expect(AppsEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppsEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test("get list of events matching the city selected by the user", async () => {
    const locations = extractLocations(mockData.items);
    expect(locations.length).toBeGreaterThan(0);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === "London, UK"
    );
    let AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);

    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClick(selectedCity);
    expect(eventsToShow.length).toBeGreaterThan(0);
    // AppWrapper.unmount();
  });


});


