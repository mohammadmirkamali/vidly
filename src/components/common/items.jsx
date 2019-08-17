import React, { Component } from "react";
import { DragSource } from "react-dnd";

const itemSource = {
  beginDrag(props) {
    return props.item;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    return props.handleDrop(props.item.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move"
};

class Items extends Component {
  render() {
    const { connectDragSource, item } = this.props;
    return connectDragSource(
      <div style={{ ...style }} className="item">
        {item.value}
      </div>
    );

    // return <div style={{ ...style }}>{this.props.item.value}</div>;
  }
}

export default DragSource("item", itemSource, collect)(Items);

//main component.......................................
// import { DndProvider } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";
// import CheckList from "./checkList";
// <DndProvider backend={HTML5Backend}>
// <CheckList />
// </DndProvider>

//How to render items and targets

// Target
// key={l.id}
// handleTarget={id => this.handleTarget(id)}
// id={l.id}
// title={l.name}
// items={tasks
// .filter(t => t.taskPosition === l.id)
// .map(i => (
// <Items item={i} key={i.id} handleDrop={() => this.handleDrop(i)} />
// ))}
