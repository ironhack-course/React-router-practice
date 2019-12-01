import React from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
// import { Link } from 'react-router-dom';

export default class Posts extends React.Component {
    state = {
        posts: []
    }

    componentDidUpdate () {
        
    }

    componentDidMount () {
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            } )
            .catch(error => {
                // console.log(error);
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        // this.props.history.push('/'+id);
        this.props.history.push({pathname: '/posts/'+id});
        
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
            posts = this.state.posts.map(post => 
                    // <Link to={'/' + post.id} key={post.id}>
                        <Post 
                            key={post.id} 
                            title={post.title} 
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}
                            />
                    // </Link>
        );
        return (
            <div>
            <Route path={this.props.match.url+'/:id'} component={FullPost} />
            <section className="Posts">
                {posts}
            </section>
            </div>
        )
    }
}
