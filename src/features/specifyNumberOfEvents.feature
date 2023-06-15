Feature: Specify Number Of Events

Scenario: When the user puts 1 in the event box
Given user has entered 1 in the event box
When clicks update
Then 1 event is shown on the screen

Scenario: When the user puts 2 in the event box
Given user has entered 2 in the event box
When the user clicks update
Then 2 events are shown on the screen

