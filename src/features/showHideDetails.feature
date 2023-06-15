Feature: Show/Hide Details 

Scenario: when the user clicks on the show details button 
Given user has searched for a city
When clicks the show details button
Then event details for the selected city are shown

Scenario: when the user clicks the hide details button 
Given the user has clicked show details on an event
When the user clicks the hide details button 
Then the event details should collapse and revert to the show details button.

