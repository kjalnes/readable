import React, { Component } from 'react';

class Posts extends Component {
    state = {
    }

    render() {
        console.log('Posts being rendered', this.props)
        return (
            <div>
                <h1>{this.props.category}</h1>
                <ul>
                    <li>Post</li>
                    <li>Post</li>
                    <li>Post</li>
                </ul>
            </div>
        )
    }
}

export default Posts;
