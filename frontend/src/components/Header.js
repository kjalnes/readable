import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from './Posts';

class Header extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <ul>{this.props.categories.map( (cat, i) => {
                  return (
                      <li key={i}>
                          <Link to={`/${cat.path}`}>{cat.name}</Link>
                      </li>
                  )
                })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories
  }
}


export default connect(mapStateToProps, null)(Header);


