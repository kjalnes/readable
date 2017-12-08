import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Header from './Header';
import Posts from './Posts';
import Post from './Post';
import Footer from './Footer';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchCategories } from '../actions/categories';
import { fetchPosts } from '../actions/posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className='App'>
        <div className='content'>
          <Header {...this.props} />
          {this.props.categories.map( (cat, i) => {
              return (
                <Route
                  exact path={`/${cat.path}`}
                  key={i}
                  render={() => <Posts category={cat.name} posts={this.props.posts} {...this.props} />}
                />)
          })}
          <Route path='/:category/:id' component={Post} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    posts: state.postData.posts
  }
}


App.propTypes = {
  categories: PropTypes.array.isRequired,
  posts: PropTypes.object
}

export default connect(mapStateToProps, {fetchCategories, fetchPosts})(App);


