import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../assets/images/logo.png';
import bookLogo from '../assets/images/book.png';

class Header extends Component {
    constructor() {
      super()
      this.state = {
        tab: 'all'
      }
    }

    setActiveTab(cat) {
      this.setState({tab: cat})
    }

    render() {
        let { categories } = this.props;
        categories = [{name:'all', path:''}].concat(categories);
        return (
            <div>
              <header className="App-header">
                <div className='header-container'>
                  <div className='top-header'>
                    <img src={logo} className="App-logo-1" alt="Readable" />
                  </div>
                </div>
                <Link to='/'>
                  <img src={bookLogo} className="App-logo" alt="Readable" />
                </Link>
                <h1 className="App-title">Readable</h1>
              </header>
              <p className="App-intro">Udacity Project</p>
              <ul>
                {categories.map((cat, i) => {
                const linkClassName = this.state.tab === cat.name ? 'active' : '';
                return (
                    <li key={i}>
                      <Link
                        to={`/${cat.path}`}
                        className={linkClassName}
                        onClick={() => this.setActiveTab(cat.name)}
                        >{cat.name}</Link>
                    </li>)
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


