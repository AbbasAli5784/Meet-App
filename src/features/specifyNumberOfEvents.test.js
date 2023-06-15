import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import Event from "../Event";
import { mount } from "enzyme";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When the user puts 1 in the event box", ({ given, when, then }) => {
    let AppWrapper;

    given("user has entered 1 in the event box", () => {
      AppWrapper = mount(<App />);
      AppWrapper.find(".number").simulate("change", {
        target: { value: 1 },
      });
    });

    when("clicks update", () => {
      AppWrapper.find(".update-btn").simulate("click");
    });

    then("1 event is shown on the screen", () => {
      const EventComponents = AppWrapper.find(Event);
      expect(EventComponents).toHaveLength(1);
    });
  });

  test("When the user puts 2 in the event box", ({ given, when, then }) => {
    let AppWrapper;
    given("user has entered 2 in the event box", () => {
      AppWrapper = mount(<App />);
      AppWrapper.find(".number").simulate("change", {
        target: { value: 2 },
      });
    });

    when("the user clicks update", () => {
      AppWrapper.find(".update-btn").simulate("click");
    });

    then("2 events are shown on the screen", () => {
      const EventComponents = AppWrapper.find(Event);
      expect(EventComponents).toHaveLength(2);
    });
  });
});
