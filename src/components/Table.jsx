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
    const bottomOfPageRange = this.state.page * this.props.perPage + 1;
    const maxTopRange = bottomOfPageRange + this.props.perPage - 1;
    const topOfPageRange = this.props.rows.length <= maxTopRange ? this.props.rows.length : maxTopRange;

    const routesDisplayed = this.props.rows.slice(bottomOfPageRange - 1, topOfPageRange);
    
    const displayCurrentRoutesMessage = `
      Showing ${routesDisplayed.length === 0 ? 0 : bottomOfPageRange} - 
      ${topOfPageRange} routes of ${this.props.rows.length} routes`;
  
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
         <p>{displayCurrentRoutesMessage}</p>
         <p>
            <button disabled={this.state.page === 0} onClick={() => this.handlePreviousPage()}>
              Previous Page
            </button>
            <button disabled={topOfPageRange + 1 >= this.props.rows.length} onClick={() => this.handleNextPage()}>
              Next Page
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Table;