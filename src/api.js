export const extractLocations = (events) => {
  var extractLocations = events.items.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};
