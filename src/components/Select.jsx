import React from 'react';

class Select extends React.Component {
  handleChange = e => {
    e.preventDefault();
    this.props.onSelect(e.target.value);
  }

  render() {
    let options = this.props.options.map(option => {
      const value = option[this.props.valueKey];
      return <option key={value} value={value} disabled={option.disabled}>
        {option[this.props.titleKey]}
      </option>
    });

    return (
      <select value={this.props.value} onChange={this.handleChange}>
        <option key="all" value="all">{this.props.allTitle}</option>
        {options}
      </select>
    );
  }
}

export default Select;