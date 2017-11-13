import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../assets/images/logo.png';
import bookLogo from '../assets/images/book.png';
import { firstLetterUppercase } from '../utils';

class Header extends Component {
    constructor() {
      super()
      this.state = {
      }
    }

    render() {
        let { categories } = this.props;
        const path = this.props.location.pathname.slice(1);
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
              <ul className='nav'>
                {categories.map((cat, i) => {
                const linkClass = path === cat.path ? 'active' : '';
                return (
                    <li key={i} className='nav-tabs'>
                      <Link
                        to={`/${cat.path}`}
                        className={linkClass}
                        >{firstLetterUppercase(cat.name)}</Link>
                    </li>)
              })}
              </ul>
            </div>
        )
    }
}



const mapStateToProps = (state, props) => {
  const categories = [{name:'all', path:''}].concat(state.categories);
  return {
    categories
  }
}


export default connect(mapStateToProps, null)(Header);


