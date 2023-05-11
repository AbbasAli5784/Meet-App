import React, { Component } from "react";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
  };
  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ query: value });

    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
      query: value,
      suggestions,
    });
  };

  handleItemClick = (suggestion) => {
    this.setState({
      query: suggestion,
    });
  };
  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className="suggestions">
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li key="all">
            <b>See All Cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
