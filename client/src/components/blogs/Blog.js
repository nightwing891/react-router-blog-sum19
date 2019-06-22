import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';

class Blog extends Component {
  state = { posts: [] }

  componentDidMount() {
    axios.get("/api/posts")
      .then( res => {
        this.setState({ posts: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }

  addPost = (post) => {
    // add the post to the backend
    // post: { title: '', body: ''}
    axios.post('/api/posts', { post })
      .then( res => {
        // add it the post to the frontend / or state
        const { posts } = this.state
        this.setState({ posts: [...posts, res.data ]})
      })
      .catch( err => {
        console.log(err)
      })
  }

  deletePost = (id) => {
    // delete in the db
    axios.delete(`/api/posts/${id}`)
      .then( res => {
        // delete in the state
        const { posts } = this.state
        this.setState({ posts: posts.filter(p => p.id !== id) })
      })
  }

  editPost = (post) => {
    // update in db
    axios.put(`/api/posts/${post.id}`, { post })
      .then( res => {
        // update in the state
        const newPosts = this.state.posts.map( p => {
          if (p.id === post.id)
            return res.data
          return p 
        })
        this.setState({ posts: newPosts })
      })
      .catch( err => {
        console.log(err)
      })
  }

  renderPost = () => {
    const { posts } = this.state
    return posts.map( post => <Post key={post.id} {...post} remove={this.deletePost} edit={this.editPost} />)
  }

  render() {
    return(
      <>
        <h1>Blog Page</h1>
        <PostForm add={this.addPost} />
        { this.renderPost() }
      </>
    )
  }
}

export default Blog;