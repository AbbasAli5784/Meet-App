import React from "react";
import { shallow } from "enzyme";
import Event from "./Event";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(
      <Event
        event={{
          summary: "Test Event",
          description: "Test Description",
          location: "Test Location",
        }}
      />
    );
  });

  test("event details are hidden by default", () => {
    expect(EventWrapper.find(".event-details")).toHaveLength(0);
  });

  test("show details on click", () => {
    EventWrapper.find("button").simulate("click");
    expect(EventWrapper.find(".event-details")).toHaveLength(1);
  });

  test("hide details on click", () => {
    EventWrapper.find("button").simulate("click");
    expect(EventWrapper.find(".event-details")).toHaveLength(0);
  });
});
