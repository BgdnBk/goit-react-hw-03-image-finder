import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    nameImg: '',
  };

  handleChange = e => {
    this.setState({ nameImg: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.nameImg.trim() === '') {
      return toast.error('Введите имя категории');
    }
    this.props.onSubmit(this.state.nameImg.trim());
    this.setState({ nameImg: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Поиск</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.nameImg}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
