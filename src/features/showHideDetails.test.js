import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import CitySearch from "../CitySearch";
import App from "../App";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";
import Event from "../Event";

const feature = loadFeature("./src/features/showHideDetails.feature");

defineFeature(feature, (test) => {
  test("when the user clicks on the show details button", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    let EventWrapper;
    given("user has searched for a city", () => {
      const locations = extractLocations(mockData.items);

      EventWrapper = mount(<Event event={mockData.items[0]} />);
      AppWrapper = mount(<App />);
      AppWrapper.find(".city").simulate("change", {
        target: { value: "Berlin, Germany" },
      });
    });

    when("clicks the show details button", () => {
      EventWrapper.find(".event .details-btn").at(0).simulate("click");
    });

    then("event details for the selected city are shown", () => {
      expect(EventWrapper.find(".event .event-details")).toHaveLength(1);
    });
  });

  test("when the user clicks the hide details button", ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;

    given("the user has clicked show details on an event", () => {
      EventWrapper = mount(
        <Event event={mockData.items[0]}  />
      );

      EventWrapper.find(".event .details-btn").at(0).simulate("click");
      expect(EventWrapper.state("showDetails")).toBe(true);
      
    });

    when("the user clicks the hide details button", () => {
      EventWrapper.find(".event .details-btn").at(0).simulate("click");
      expect(EventWrapper.state("showDetails")).toBe(false);
    });

    then(
      "the event details should collapse and revert to the show details button.",
      () => {}
    );
  });
});
