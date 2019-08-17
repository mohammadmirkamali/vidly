import React, { Component } from "react";
import Items from "./common/items";
import Target from "./common/target";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class CheckList extends Component {
  state = {
    data: { tasks: "" },
    tasks: [
      { id: 1, value: "gym", taskPosition: 1 },
      { id: 2, value: "reading", taskPosition: 2 },
      { id: 3, value: "read", taskPosition: 1 }
    ],
    lists: [
      { id: 1, name: "To Do" },
      { id: 2, name: "Doing" },
      { id: 3, name: "Done" }
    ],
    target: 2,
    counter: 4
  };

  handleSubmit = e => {
    e.preventDefault();
    const tasks = [...this.state.tasks];
    const counter = this.state.counter + 1;

    tasks.push({ id: counter, value: this.state.data.tasks, taskPosition: 1 });

    this.setState({ tasks, counter });
  };

  handleChange = e => {
    const data = { ...this.state.data };
    data.tasks = e.currentTarget.value;
    this.setState({ data });
  };

  handleDrop = item => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(item);
    tasks[index] = { ...tasks[index] };
    tasks[index].taskPosition = this.state.target;
    this.setState({ tasks });
  };

  handleTarget = id => {
    this.setState({ target: id });
  };

  render() {
    const { tasks, lists } = this.state;
    return (
      <React.Fragment>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <TextField
            label="Add Task"
            variant="outlined"
            value={this.state.data.tasks}
            onChange={this.handleChange}
          />

          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            disabled={this.state.data.tasks ? false : true}
          >
            Add
          </Button>
        </div>
        {lists.map(l => (
          <Target
            key={l.id}
            handleTarget={id => this.handleTarget(id)}
            id={l.id}
            title={l.name}
            items={tasks
              .filter(t => t.taskPosition === l.id)
              .map(i => (
                <Items
                  item={i}
                  key={i.id}
                  handleDrop={() => this.handleDrop(i)}
                />
              ))}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default CheckList;
