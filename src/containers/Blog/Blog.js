import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';

// import NewPost from './NewPost/NewPost';

//Lazy loading or code splitting 
// import asyncComponent from '../../HOC/asyncComponent';
// const AsyncNewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost')
// });


//React 16.6 React Suspense
const NewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: 'rgb(72, 197, 55)',
                                    textDecoration: 'underline'
                                }}
                                >Home</NavLink> </li>
                            <li><NavLink to={{
                                // a way to generate relative path
                                // pathname: this.props.match.url + '/new-post',
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }} exact>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path='/' render={() => <h1>Test</h1>} /> */}
                <Switch>
                    {/* {this.state.auth && <Route path='/new-post' component={AsyncNewPost} />} */}
                    {this.state.auth && <Route path='/new-post' render={() => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <NewPost {...this.props}/>
                    </Suspense>)} />}
                    <Route path='/posts' component={Posts} />
                            

                    {/* Redirect is used as a guard if user is not authenticated or if you 404*/}
                    <Redirect from="/" to="/posts" />

                    {/* Catch all 404 Route */}
                    {/* <Route render={()=><h1>Not Found</h1>}/> */}
                </Switch>
                </div>
        );
    }
}

export default Blog;