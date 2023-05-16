import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  const event = {
    summary: "Test Event",
    location: "Test Location",
    start: {
      dateTime: "2023-05-20T12:00:00Z",
      timeZone: "America/Los_Angeles",
    },
    description: "Test Description",
  };
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test("render event summary", () => {
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });

  // test("render event location", () => {
  //   expect(EventWrapper.find(".location")).toHaveLength(1);
  // });

  // test("render event date and timezone", () => {
  //   expect(EventWrapper.find(".date-time")).exists().toBe(true);
  // });

  test("render show details button", () => {
    expect(EventWrapper.find(".details-btn")).toHaveLength(1);
  });
  test("change show-state on click", () => {
    EventWrapper.find(".details-btn").simulate("click");
    expect(EventWrapper.state("showDetails")).toBe(true);
    expect(EventWrapper.find(".location")).toHaveLength(1);
    expect(EventWrapper.find(".date-time")).toHaveLength(1);
  });
});
