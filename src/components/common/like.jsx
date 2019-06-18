import React, { Component } from "react";
class Like extends Component {
  render() {
    return (
      <i
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
        className={this.likeClasses()}
        aria-hidden="true"
      />
    );
  }

  likeClasses() {
    let classes = "fa fa-heart";
    if (!this.props.liked) {
      classes += " fa fa-heart-o";
    }
    return classes;
  }
}

export default Like;
