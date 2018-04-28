/**
 * /*
 * Todo App Page
 *
 * This is todo App Page, at the '/features/todo' route
 *
 * @format
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import { todoViewer } from './selectors';
import { addTodo, handleTodo, deleteTodo, filterTodo } from './actions';
import reducer from './reducers';

import List from './ListTodo';
import TodoConfig from './TodoConfig';
import Filter from './Filter';

class TodoAppPage extends Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      todoDataConfig: {},
      showAdder     : false,
      filter        : 'All',
    };
  }

  onAction = {
    onHandleTodo: this.props.onHandleTodo,
    onDeleteTodo: this.props.onDeleteTodo,
    onAddTodo   : this.props.onAddTodo,
  };

  onEditHandle = ({ id, name, description, status }) =>
    this.setState({
      todoDataConfig: { id, name, description, status },
      showAdder: !this.state.showAdder,
    });
  onAddHandle = () =>
    this.setState({ showAdder: !this.state.showAdder, todoDataConfig: {} });
  toggleShowAdder = () => this.setState({ showAdder: !this.state.showAdder });

  render() {
    return (
      <article>
        <Helmet>
          <title>TO DO APP</title>
          <meta name="description" content="Todo app page" />
        </Helmet>
        <div className="col-12">
          <h2>TODO APP</h2>
          <Button color="primary" size="sm" onClick={this.onAddHandle}>
            Add
          </Button>
          <Filter onChangeHandle={this.props.onFilterTodo} />
        </div>
        <div>
          {this.state.showAdder && (
            <TodoConfig
              onClose = {this.toggleShowAdder}
              onAdder = {this.props.onAddTodo}
              todo    = {this.state.todoDataConfig}
            />
          )}
          <List
            listTodo     = {this.props.todo.todoList}
            onAction     = {this.onAction}
            onEditHandle = {this.onEditHandle}
          />
        </div>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    onAddTodo   : ({ name, description, id }) =>
      dispatch(addTodo({ name, description, id })),
    onHandleTodo: (id, status) => dispatch(handleTodo(id, status)),
    onDeleteTodo: id => dispatch(deleteTodo(id)),
    onFilterTodo: filter => dispatch(filterTodo(filter)),
  });


const mapStateToProps = createStructuredSelector({ todo: todoViewer() });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'todo', reducer });

TodoAppPage.propTypes = {
  todo        : PropTypes.shape({
    todoList: PropTypes.array.isRequired,
    filter  : PropTypes.string.isRequired,
  }).isRequired,
  onHandleTodo: PropTypes.func,
  onDeleteTodo: PropTypes.func,
  onAddTodo   : PropTypes.func,
  onFilterTodo: PropTypes.func,
};

export default compose(withReducer, withConnect)(TodoAppPage);
