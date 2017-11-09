import React, { Component } from 'react';
import { connect } from 'react-redux';

class Categories extends Component {
    state = {
        activeTab: null
    }

    componentDidMount() {
        // console.log(this.props.categories)
    }

    render() {
        console.log('this.props', this.props)
        return (
            <div>
                <ul>
                    {this.props.categories.map( (cat, i) => {
                            return (
                                <li onClick={()=> {
                                        console.log('click')
                                    }} key={i}>
                                    {cat.name}
                                </li>)
                        })
                    }
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


export default connect(mapStateToProps, null)(Categories);
