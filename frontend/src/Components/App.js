import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import bookLogo from '../assets/images/book.png';
import '../App.css';
import Header from './Header';
import Posts from './Posts';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { fetchCategories } from '../actions/categories';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // backend: 'backend-data'
    }
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='header-container'>
            <div className='top-header'>
              <img src={logo} className="App-logo-1" alt="Readable" />
            </div>
          </div>
          <img src={bookLogo} className="App-logo" alt="Readable" />
          <br />
          <h1 className="App-title">Readable</h1>
        </header>
        <p className="App-intro">
        Udacity Project
        </p>
        <Header />
        {this.props.categories.map( (cat, i) => {
            return (
              <Route exact path={`/${cat.path}`} key={i} render={ () => (
                  <Posts category={cat.name} /> )}
              />
            )
        })}
        <hr />
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

// <Link to={{
//   pathname: '/courses',
//   search: '?sort=name',
//   hash: '#the-hash',
//   state: { fromDashboard: true }
// }}>
//   Courses
// </Link>
