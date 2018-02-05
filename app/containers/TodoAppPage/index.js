/*
 * Todo App Page
 *
 * This is todo App Page, at the '/features/todo' route
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Helmet } from 'react-helmet';

import Utils from '../../utils/utils';
import List from './ListTodo';
import TodoConfig from './TodoConfig';

class TodoAppPage extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      todoDataConfig: {},
      showAdder: false,
      todoList: [{
        id: Utils.getRandomId(),
        name: 'React',
        description: 'react app',
        status: 'done',
      }, {
        id: Utils.getRandomId(),
        name: 'Redux',
        description: 'Using redux',
        status: 'on going',
      }, {
        id: Utils.getRandomId(),
        name: 'React Native',
        description: 'Using react Native',
        status: 'todo',
      }],
    };
  }

  addTodo = ({ name, description, id }) => {
    const todoList = [
      ...this.state.todoList.filter((item) => item.id !== id),
      {
        id: id || Utils.getRandomId(),
        name,
        description,
        status: 'todo',
      },
    ];
    this.setState({ todoList, showAdder: false });
  };

  removeTodo = (id) => this.setState({ todoList: this.state.todoList.filter((item) => item.id !== id) })

  changeStatusTodo = (id) => {
    const todo = this.state.todoList.find((item) => item.id === id);

    const newStatus = (todoItem) => {
      switch (todoItem.status) {
        case 'todo':
          return { ...todoItem, status: 'on going' };
        case 'on going':
          return { ...todoItem, status: 'done' };
        default:
          return { ...todoItem, status: 'todo' };
      }
    };

    return this.setState({
      todoList: [...this.state.todoList.filter((item) => item.id !== id), newStatus(todo)],
    });
  }

  editTodo = (id) =>
    this.setState({
      showAdder: !this.state.showAdder,
      todoDataConfig: this.state.todoList.find((item) => item.id === id),
    });

  onAction = (id, action) => {
    switch (action) {
      case 'delete':
        return this.removeTodo(id);
      case 'edit':
        return this.editTodo(id);
      default:
        return this.changeStatusTodo(id);
    }
  }

  toggleShowAdder = () => this.setState({ showAdder: !this.state.showAdder, todoDataConfig: {} });

  render() {
    return (
      <article>
        <Helmet>
          <title>TO DO APP</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="col-12">
          <h2>TODO APP</h2>
          <Button color="primary" size="sm" onClick={this.toggleShowAdder} >Add</Button>
        </div>
        <div>
          {
            this.state.showAdder && <TodoConfig onClose={this.toggleShowAdder} onAdder={this.addTodo} todo={this.state.todoDataConfig} />
          }
          <List listTodo={this.state.todoList} onAction={this.onAction}></List>
        </div>
      </article>
    );
  }
}

export default TodoAppPage;
