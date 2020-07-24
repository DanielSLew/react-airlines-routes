import React from 'react';

class Table extends React.Component {
  static defaultProps = {
    columns: [{name: 'header', propery: 'value'}],
    rows: [{id: 1, value: 'cell'}],
    format: (property, value) => value,
    perPage: 25,
    className: 'table',
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    }
  }

  handlePreviousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  handleNextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  render() {
    const firstRoute = this.state.page * this.props.perPage;
    const upperLimit = firstRoute + this.props.perPage - 1;
    const lastRoute = this.props.rows.length < upperLimit ? this.props.rows.length : upperLimit;

    const routesDisplayed = this.props.rows.slice(firstRoute, lastRoute + 1);
    
    return (
      <div>
        <table className={this.props.className}>
          <thead>
            <tr>
              <th>Airline</th>
              <th>Source</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
            {routesDisplayed.map(row => (
              <tr key={row.airline + row.dest + row.src}>
                {this.props.columns.map(({property}, col) => (
                  <td key={row[property] + property}>{this.props.format(property, row[property])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
         <p>Showing {lastRoute === 0 ? 0 : firstRoute + 1} - {lastRoute + 1} routes of {this.props.rows.length} routes</p>
         <p>
            <button disabled={this.state.page === 0} onClick={() => this.handlePreviousPage()}>
              Previous Page
            </button>
            <button disabled={lastRoute + 1 >= this.props.rows.length} onClick={() => this.handleNextPage()}>
              Next Page
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Table;