import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeEach(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test("render number input", () => {
    expect(NumberOfEventsWrapper.find(".number")).toHaveLength(1);
  });

  test("render number input correctly", () => {
    const number = NumberOfEventsWrapper.state("eventCount");
    expect(NumberOfEventsWrapper.find(".number").prop("value")).toBe(number);
  });

  test("change state when text input changes", () => {
    NumberOfEventsWrapper.find(".number").simulate("change", {
      target: { value: "5" },
    });
    expect(NumberOfEventsWrapper.state("eventCount")).toBe("5");
  });

  test("call updateEvents when text input changes", () => {
    const updateEvents = jest.fn();
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents updateEvents={updateEvents} />
    );
    NumberOfEventsWrapper.find(".number").simulate("change", {
      target: { value: "5" },
    });
    expect(updateEvents).toHaveBeenCalledTimes(1);
  });

  test("render text input correctly", () => {
    const numberOfEvents = NumberOfEventsWrapper.state("eventCount");
    expect(NumberOfEventsWrapper.find(".number").prop("value")).toBe(
      numberOfEvents
    );
  });

  test("default number of events is set correctly", () => {
    expect(NumberOfEventsWrapper.state("eventCount")).toBe(32);
  });

  test("change state when number input changes", () => {
    const eventObject = { target: { value: 32 } };
    NumberOfEventsWrapper.find(".number").simulate("change", eventObject);
    expect(NumberOfEventsWrapper.state("eventCount")).toBe(32);
  });
});
