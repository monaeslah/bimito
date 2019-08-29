import React, { Component } from "react";
import { Card } from "react-bootstrap";


export default class Posts extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        hasErrors: false,
        newTitle:undefined,
        newBody:undefined,
      };
    }

    render(){

        const {post}=this.props;

        return (
            <Card className="card" key={post.id}>
              <Card.Body className="card-div">
                <div style={{ height: "220px" }}>
                  <Card.Title style={{ padding: "10px", fontSize: "18px" }}>
                    {post.title}
                  </Card.Title>

                  <Card.Text>{post.body}</Card.Text>
                </div>
                <button
                  onClick={() => {
                    this.setState(
                      {
                        editableTitle: post.title,
                        editableBody: post.body
                      },
                      () => this.props.editPost(post.id)
                    );
                  }}
                >
                  edit
                </button>
                <button
                  className="button-style"
                  onClick={()=>this.props.setModalId(post.id)}
                >
                  delete
                </button>
                {this.props.postIsEditing &&
                  this.props.postIsEditing === post.id && (
                    <React.Fragment>
                      <input
                        type="text"
                        placeholder="title"
                        onChange={e =>
                          this.setState({ editableTitle: e.target.value })
                        }
                        value={this.state.editableTitle}
                      />

                      <input
                        type="text"
                        placeholder="body"
                        onChange={e =>
                          this.setState({ editableBody: e.target.value })
                        }
                        value={this.state.editableBody}
                      />

                      <input
                      className="btn-edt"
                        type="button"
                        value="Confirm"
                        onClick={() =>
                          this.props.upsertPost(
                            post.id,
                            this.state.editableTitle,
                            this.state.editableBody
                          )
                        }
                      />

                      <input
                        className="btn-cncl"
                        type="button"
                        value="Cancel"
                        onClick={this.props.cancelDelete}
                      />
                    </React.Fragment>
                  )}
              </Card.Body>
            </Card>
          );
    }



}  