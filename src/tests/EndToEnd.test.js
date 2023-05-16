import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> integration", () => {
  let EventWrapper, AppWrapper;
  const event = {
    summary: "Test Event",
    location: "Test Location",
    start: {
      dateTime: "2023-05-20T12:00:00Z",
      timeZone: "America/Los_Angeles",
    },
    description: "Test Description",
  };

  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test("An event element is collapsed by default", () => {
    expect(EventWrapper.find(".event-details")).toHaveLength(0);
  });

  test("User can expand an event to see its details", () => {
    EventWrapper.find(".details-btn").simulate("click");
    expect(EventWrapper.find(".event-details")).toHaveLength(1);
  });

  test("User can collapse an event to hide its details", () => {
    EventWrapper.find(".details-btn").simulate("click");
    expect(EventWrapper.find(".event-details")).toHaveLength(0);
  });
});
