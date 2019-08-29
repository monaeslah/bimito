import React from 'react'
export default class AddPost extends React.Component{

    constructor(){
        super();
        this.state={
            newTitle:undefined,
            newBody:undefined,
        }
    }
    render(){
        return(
            <React.Fragment>
            {this.props.addNewPostToggle && <input
               type="text"
               placeholder="title"
               onChange={e => this.setState({ newTitle: e.target.value })}
               value={this.state.newTitle}
             />}
   
           {this.props.addNewPostToggle &&  <input
               type="text"
               placeholder="body"
               onChange={e => this.setState({ newBody: e.target.value })}
               value={this.state.newBody}
             />}
   
             <input
              className="btn-edt"
               type="button"
               value={this.props.addNewPostToggle?"Save New Post":"Add New Post?"}
               onClick={() =>{
                this.props.updateNewPostToggle();


                 this.props.addNewPostToggle &&
                 this.props.upsertPost(
                   this.props.maxPostsLength+1,
                   this.state.newTitle,
                   this.state.newBody
                 )
               }
                
               }
             />
             
           </React.Fragment>
   
        )
    }
}