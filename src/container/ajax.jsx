import React, { Component } from "react";
import Aux from "../hoc/aux";
import http from "../services/httpService";
import config from "../config.json";
import { toast } from "react-toastify";
class AjaxDemo extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }
  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };
  handleUpdate = async post => {
    post.title = "updated";
    await http.put(config.apiEndpoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };
  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete("s" + config.apiEndpoint + "/" + post.id);
      console.log("try block");
    } catch (ex) {
      if (ex.response && ex.response.status) {
        toast.error("this post has already been deleted");
      }
      this.setState({ posts: originalPosts });
    }
  };
  render() {
    console.log(this.state.posts);
    return (
      <Aux>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table width="100%" className="table">
          <thead>
            <tr>
              <th>title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-primaty"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Aux>
    );
  }
}

export default AjaxDemo;
