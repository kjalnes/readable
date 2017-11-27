import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Posts from './Posts';
import Post from './Post';
import Footer from './Footer';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchCategories } from '../actions/categories';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className='App'>
        <Header {...this.props} />
        {this.props.categories.map( (cat, i) => {
            return (
              <Route
                exact path={`/${cat.path}`}
                key={i}
                render={() => <Posts category={cat.name} {...this.props} />}
              />)
        })}
        <Route path='/:category/:id' component={Post} />
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return { fetchCategories: () => dispatch(fetchCategories()) }
}

const mapStateToProps = (state, props) => {
  const categories = [{name:'all', path:''}].concat(state.categories);
  return { categories }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

