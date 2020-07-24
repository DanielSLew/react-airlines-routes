import React, { Component } from 'react';
import './App.css';
import Data from './data.js';
import Table from './components/Table.jsx';
import Select from './components/Select.jsx';

const {routes, airlines, airports, getAirportByCode, getAirlineById} = Data;

class App extends Component {
  defaultState = {
    airline: 'all',
    airport: 'all',
  }

  constructor(props) {
    super(props);

    this.state = this.defaultState;
  }

  clearFilters = () => {
    this.setState(this.defaultState);
  }

  initialState = () => {
    return this.state.airport === 'all' && this.state.airline === 'all';
  }

  formatValue(property, value) {
    return (property === 'airline' ? getAirlineById(value) : 
                                     getAirportByCode(value)).name;
  }

  selectAirline = (airlineId) => {
    if (airlineId !== 'all') {
      airlineId = parseInt(airlineId, 10);
    }

    this.setState({ airline: airlineId });
  }

  selectAirport = (airportCode) => {
    this.setState({ airport: airportCode });
  }

  routeHasAirline = (route) => {
    const airline = this.state.airline;
    return route.airline === airline || 'all' === airline;
  }

  routeHasAirport = (route) => {
    const airport = this.state.airport;
    return route.src === airport || route.dest === airport || 'all' === airport;
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},    
    ];

    const filteredRoutes = routes.filter(route => {
      return this.routeHasAirline(route) && this.routeHasAirport(route);
    });

    const filteredRoutesByAirline = routes.filter(this.routeHasAirline);
    const filteredRoutesByAirport = routes.filter(this.routeHasAirport);

    const filteredAirlines = airlines.filter(airline => {
      return filteredRoutesByAirport.some(route => route.airline === airline.id);
    });

    const filteredAirports = airports.filter(airport => {
      return filteredRoutesByAirline.some(route => {
        return route.src === airport.code || route.dest === airport.code;
      });
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>Show routes on
            <Select
              options={filteredAirlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={this.state.airline}
              onSelect={this.selectAirline}
            />
            Flying in or out of
            <Select
              options={filteredAirports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.airport}
              onSelect={this.selectAirport}
            />
            <button onClick={this.clearFilters} disabled={this.initialState()}>
              Show All Routes
            </button>
          </p>

          <Table
            className="routes-table"
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
            perPage={this.state.perPage}
          />
        </section>
      </div>
    );
  }
}

export default App;