import React, { Component } from "react";
import { DropTarget } from "react-dnd";

const style = {
  width: "20rem",
  margin: ".5rem",
  minHeight: "20rem",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  backgroundColor: "green",
  zIndex: "-1"
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
}

const itemTarget = {
  drop(props) {
    return props.handleTarget(props.id);
  }
};

class Target extends Component {
  render() {
    const { connectDropTarget, hovered, items, title } = this.props;
    const backgroundColor = hovered ? "green" : "white";

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        <h2>{title}</h2>
        <span>{items}</span>
      </div>
    );
  }
}

export default DropTarget("item", itemTarget, collect)(Target);
