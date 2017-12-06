import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../assets/images/logo.png';
import bookLogo from '../assets/images/book.png';
import { firstLetterUppercase } from '../utils';

const Header = ({categories, location}) => {
    const path = location.pathname.slice(1);
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
                    let linkClass = path.indexOf(cat.path) > -1 && cat.path !== '' ? 'active' : '';
                    if(cat.path === '' && path === '') {
                      linkClass = 'active'
                    }
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

const mapStateToProps = (state, props) => {
  return { categories: state.categories }
}

export default connect(mapStateToProps)(Header);


