import React from 'react';
import Immutable from 'immutable';

var ItemRecord = Immutable.Record({
  text: "",
  done: false
});

var initialList = [
  { done: true, text: "Prepare a presentation - Done!" },
  { done: false, text: "Book the room" },
  { done: false, text: "Finish the report" },
  { done: false, text: "Get the university degree!" }
];

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {toDoList: initialList};
  }

  addItem(itemText) {
    this.state.toDoList.push(
      { done: false, text: itemText }
    );
    var newList = this.state.toDoList;
    this.setState({ 
      toDoList: this.state.toDoList
    })
  }

  updateItem(item) {
    var index = this.state.toDoList.findIndex(todoitem => todoitem.text == item.text);
    this.state.toDoList[index] = item;
    this.setState({
      toDoList: this.state.toDoList
    });
  }

  deleteItem(item) {
    var index = this.state.toDoList.findIndex(todoitem => todoitem.text == item.text);
    this.state.toDoList.splice(index, 1);
    this.setState({
      toDoList: this.state.toDoList
    });
  }

  render() {
    return (
      <div>
        <ToDoAdder onAdd={this.addItem.bind(this)} />
        <ToDoList toDoList={this.state.toDoList} onUpdate={this.updateItem.bind(this)} onDelete={this.deleteItem.bind(this)} />
      </div>
    );
  }
}

class ToDoAdder extends React.Component {
  constructor(props){
    super(props);
    this.state = {text: ""};
  }

  addClickHandler(text) {
    this.props.onAdd(this.state.text);
    this.setState({
      text: ""
    });
  }

  textChangeHandler(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Add a new to-do to the list</h1>
        <input type="text" value={this.state.text} onChange={this.textChangeHandler.bind(this)} placeholder="New task"/>
        <button onClick={this.addClickHandler.bind(this)}>Add</button>
      </div>
    );
  }
}

class ToDoList extends React.Component {
  onDelete(item) {
    this.props.onDelete(item);
  }

  onUpdate(item) {
    this.props.onUpdate(item);
  }

  render() {
    var items = this.props.toDoList.map(item => {
      return <ToDoItem item={item} onUpdate={this.onUpdate.bind(this)} onDelete={this.onDelete.bind(this)} key={item.text} />;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Done</th>
            <th>Task</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    );
  }
}

class ToDoItem extends React.Component{
  toggleDone() {
    if (this.props.item.done) {
      this.props.item['text'] = 
          this.props.item['text'].substring(0, this.props.item['text'].length - 8);
    } else {
      this.props.item['text'] += " - Done!";
    }

    this.props.item['done'] = !this.props.item.done;
    this.props.onUpdate(this.props.item);
  }

  deleteItem() {
    this.props.onDelete(this.props.item);
  }

  render() {
    var done = this.props.item.done;
    var text = this.props.item.text;

    var rowStyle = {};
    if (done) {
      rowStyle.backgroundColor = "lightgreen";
      rowStyle.fontWeight = "bold";
    }

    return (
      <tr style={rowStyle}>
        <td>
          <input type="checkbox" checked={done} onChange={this.toggleDone.bind(this)} />
        </td>
        <td>
          <span>{text}</span>
        </td>
        <td>
          <button onClick={this.deleteItem.bind(this)}>x</button>
        </td>
      </tr>
    );
  }
}

export default App;