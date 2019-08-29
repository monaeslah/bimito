import React, { Component} from "react";
import Post from "./Post"
import Modal from './Modal'
import AddPost from './AddPost'

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],

      postIsEditing: -1,
      showModal:-1,
      
      addNewPostToggle:false,
      hasErrors: false,

     
    };
  }


  loadpost() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(res => this.setState({ posts:res }))
      .catch(() => this.setState({ hasErrors: true }));
  }

  deletePost = postId => {
   
    this.setState(prevState => ({
      posts: prevState.posts.filter(post => post.id !== postId),
      showModal:-1,
    }));
  };

  editPost=(postId)=> {
    if (this.state.postIsEditing !== -1) {
      alert('you can"t edit concurent two posts!!');
    } else {
      this.setState({ postIsEditing: postId });
    }
  }
  
  upsertPost = (id, title, body) => {
    this.setState({
      postIsEditing: -1,
      posts: [
        ...this.state.posts.filter(post => post.id !== id),
        {
          id,
          title,
          body,
          usreId: 1
        }
      ].sort((a, b) => a.id - b.id)
    });
  };

  componentDidMount() {
    this.loadpost();
  }

 

  render() {
   

    return (
      <React.Fragment>
        
       <AddPost
          maxPostsLength={this.state.posts.length}
          upsertPost={this.upsertPost}
          addNewPostToggle={this.state.addNewPostToggle}
          updateNewPostToggle={()=>this.setState({addNewPostToggle:!this.state.addNewPostToggle})}
       />

        <div id="article-body">
          {this.state.posts.map(
            (post, index) => <Post 
              post={post}
              showModal={this.state.showModal}
              setModalId={postId =>{
                this.setState({showModal:postId})
                 }}
              upsertPost={this.upsertPost}
              editPost={this.editPost}    
              postIsEditing={this.state.postIsEditing}
              cancelDelete={() => this.setState({ postIsEditing: -1 })}
            />)}
        </div>

        <Modal 
          showModal={this.state.showModal}
          onCancel={()=>this.setState({showModal:-1})}
          onConfirm={()=> this.deletePost(this.state.showModal)}
          />

        

      </React.Fragment>
    );
  }
}
