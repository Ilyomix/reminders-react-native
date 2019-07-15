import React from 'react';
import * as Expo from 'expo';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import { TopNavigation, TopNavigationProps } from 'react-native-ui-kitten';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';

import TodoList from '../components/TodoList';

import { createTodo, updateTodo, deleteTodo, getTodos } from '../actions/todoListActions';

export function TodoView(props) {
  const {
    handleAddTodoItem,
    handleDeleteTodoItem,
    handleUpdateTodoItem,
    handleGetTodos,
  } = props;

  const currentTodosTasksNumber = handleGetTodos() && handleGetTodos().length;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#f50057', '#f50057']}
        style={{ alignItems: 'center', }}
        start={{x: 0, y: 0.75}}
        end={{x: 1, y: 0.25}}
        style={styleTopNavigationLinearGradient.main}
      >
        <TopNavigation
          title='Reminders'
          subtitle={`${currentTodosTasksNumber} reminder${currentTodosTasksNumber > 1 ? 's' : ''} in progress`}
          titleStyle={styleTopNavigation.title}
          subtitleStyle={styleTopNavigation.subtitle}
          style={styleTopNavigation.main}
        />
      </LinearGradient>
      <TodoList 
        addTodoItem={handleAddTodoItem}
			  deleteTodoItem={handleDeleteTodoItem}
        updateTodoItem={handleUpdateTodoItem}
        todoItems={handleGetTodos}
      />
    </View>
  );
};

const styleTopNavigation = StyleSheet.create({
    main: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      padding: 7,
    },
    title: {
      color: '#ffffff',
    },
    subtitle: {
      color: '#ffffff',
    },
});

const styleTopNavigationLinearGradient = StyleSheet.create({
  main: {
    padding: 7,
  }
});

const styleBottomNavigation = StyleSheet.create({
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddTodoItem: (item) => dispatch(createTodo(item)),
    handleDeleteTodoItem: (id) => dispatch(deleteTodo(id)),
    handleUpdateTodoItem: (item) => dispatch(updateTodo(item)),
    handleGetTodos: () => (getTodos()),
  }
}

const mapStateToProps = state => {
  return state
}

const TodoViewScreen = connect(mapStateToProps, mapDispatchToProps)(TodoView)

export default TodoViewScreen;