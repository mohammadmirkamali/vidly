import React, { Component } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import CheckList from "./checkList";

class DragDrop extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <DndProvider backend={HTML5Backend}>
          <CheckList />
        </DndProvider>
      </React.Fragment>
    );
  }
}

export default DragDrop;
