import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Posts from './Posts';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchCategories } from '../actions/categories';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className="App">
        <Header {...this.props} />
        <Route exact path='/' render={() => <Posts category={null} /> } />
        {this.props.categories.map( (cat, i) => {
            return (
              <Route
                exact path={`/${cat.path}`}
                key={i}
                render={ () => <Posts category={cat.name} /> }
              />
            )
        })}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
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
