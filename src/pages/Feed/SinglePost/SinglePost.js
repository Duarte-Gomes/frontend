import React, { Component } from 'react';
/** CUSTOM HOC TO EMULATE PREVIOUS FUNCTIONALITY */
import { withRouter } from '../../../hoc/with-router';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
    state = {
        title: '',
        author: '',
        date: '',
        image: '',
        content: '',
        category: '',
        active: ''
    };

    componentDidMount() {
        /** USE CUSTOM HOC TO WRAP THIS COMPONENT */
        const postId = this.props.params.postId;
        fetch('http://localhost:8080/feed/post/' + postId)
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error('Failed to fetch status');
                }
                return res.json();
            })
            .then((resData) => {
                this.setState({
                    title: resData.post.title,
                    author: resData.post.creator.name,
                    image: 'http://localhost:8080/' + resData.post.imageUrl,
                    date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
                    content: resData.post.content,
                    category: resData.post.category,
                    active: resData.post.active,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <section className="single-post">
                <h1>{this.state.title}</h1>
                <h2>
                    Created by {this.state.author} on {this.state.date}
                </h2>
                <p>{this.state.active}</p>
                <div className="single-post__image">
                    <Image contain imageUrl={this.state.image} />
                </div>
                <p>{this.state.content}</p>
                <p>{this.state.category}</p>
            </section>
        );
    }
}

export default withRouter(SinglePost);
