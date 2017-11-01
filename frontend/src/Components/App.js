import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import bookLogo from '../assets/images/book.png';
import '../App.css';
import Categories from './Categories';
import { connect } from 'react-redux';
import { fetchCategories, receiveCategories } from '../actions/categories';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // backend: 'backend-data'
    }
  }

  componentDidMount() {
    /* works but unsure if this is correct */
    this.props.fetchCategories()

    // fetch('http://localhost:3001/categories',
    //   {
    //     headers: { 'Authorization': 'whatever-you-want' }
    //   })
    //   .then( (res) => {
    //     return res.text()
    //   })
    //   .then((data) => {
    //     // this.setState({backend:data});
    //     let categories = JSON.parse(data).categories;
    //     this.props.receiveCategories(categories)
    //   });

  /* copied from udacity classroom App.js*/
  //   const url = `${process.env.REACT_APP_BACKEND}/categories`;
  //   console.log('fetching from url', url);
  //   fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
  //                credentials: 'include' } )
  //     .then( (res) => { return(res.text()) })
  //     .then((data) => {
  //       this.setState({backend:data});
  //     });
  }

  render() {
    console.log('!!!', this.props.categories)
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
        <Categories />
        {this.props.categories}
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        // receiveCategories: (data) => dispatch(receiveCategories(data)),
        fetchCategories: () => dispatch(fetchCategories())
    }
}


export default connect(null, mapDispatchToProps)(App);
