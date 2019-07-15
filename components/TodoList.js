import React, { Component } from 'react';
import * as Expo from 'expo';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { Layout, CheckBox, Input, Button, ListItem } from 'react-native-ui-kitten';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Text } from 'react-native-paper';
import Swipeable from 'react-native-swipeable-row';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFR from 'react-native-vector-icons/Feather';

import Divider from './Divider';

class TodoList extends Component {
	state = { 
		isAddingTodoElement: false,
		todoContentToAdd: '',
	};
	
	generateTodoId = function *() {
		const id = `0x${Math.random().toString(16).substr(2, 18)}`;
		while (true) {
			yield id;
		}
	}

	handleToggleAddingTodo = () => {
		const { isAddingTodoElement } = this.state;
		this.setState({
			isAddingTodoElement: !isAddingTodoElement,
		});
	}

	handleAddTodoItem = () => {
		const { todoContentToAdd } = this.state;
		const { addTodoItem } = this.props;
		const todoId = this.generateTodoId().next().value;
		addTodoItem({
			name: todoContentToAdd,
			done: false,
			id: todoId,
		});

		this.setState({
			todoContentToAdd: '',
		})
	}
	
	handleUpdateTodoStatusItem = (checked, id) => {
		const { updateTodoItem } = this.props;
		updateTodoItem({ done: checked, id });
	}

	handleAddTodoItemContent = (inputValue) => {
		this.setState({
			todoContentToAdd: inputValue,
		})
	};

	generateSwipeLeftAction = (elem) => {
		return (
			<View style={stylesTodoActionSwipeLeft.main}>
				<Icon
					name="ios-checkmark"
					color="#fff"
					size={48}
				/>
				<Text style={stylesTodoActionSwipeLeft.label}>
					Done
				</Text>
			</View>
		)
	}
	generateActionButton = (todoElem) => {
		const { id } = todoElem;
		const { deleteTodoItem } = this.props;

		const handleDeleteTodoItem = () => deleteTodoItem(id);

		return (
			[
				<View style={stylesTodoActionButtons.main}>
					<TouchableOpacity
						style={stylesEditTodoButton.main}
					>
						<IconFR
							name="edit"
							color="#fff"
							size={17}
						/>
					</TouchableOpacity>
				</View>,
				<View style={stylesTodoActionButtons.main}>
					<TouchableOpacity
						style={stylesDeleteTodoButton.main}
						onPress={handleDeleteTodoItem}
					>
						<Icon
							name="ios-close"
							color="#fff"
							size={36}
						/>
					</TouchableOpacity>
				</View>,
			]
		)
	}

	addTodoInput = () => {
		const { 
			isAddingTodoElement,
			todoContentToAdd,
		} = this.state;

		const addTodoInput = (
			isAddingTodoElement &&
			<SimpleAnimation
				direction="down"
				duration={1000}
				distance={12}
				movementType="slide"
			>
				<View style={stylesAddTodoInputWrapper.main}>
					<Input 
						placeholder="Enter your reminder"
						size="medium" 
						value={todoContentToAdd}
						style={stylesAddTodoInput.input}
						onChangeText={this.handleAddTodoItemContent}
					/>
					<TouchableOpacity
						style={stylesAddTodoInputButton.main}
						onPress={this.handleAddTodoItem}
					>
						<Icon
							name="ios-add"
							color="#fff"
							size={30}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={stylesCloseTodoInputButton.main}
						onPress={this.handleToggleAddingTodo}
					>
						<Icon
							name="ios-return-left"
							color="#fff"
							size={30}
						/>
					</TouchableOpacity>
				</View>
			</SimpleAnimation>
		);

		return addTodoInput;
	}

	getTodos = () => {
		const { todoItems } = this.props;
		const { isAddingTodoElement } = this.state;
		const feed = todoItems();
	
		const todosElements = feed && feed.length ?
		feed.map((elem, index) => {
			const { name, done, id } = elem;
			const actionButtons = this.generateActionButton(elem);
			const leftContent = this.generateSwipeLeftAction(elem);
			const leftActionRelease = () => this.handleUpdateTodoStatusItem(!done, id);

			return (
				<Swipeable
					leftContent={leftContent}
					rightButtons={actionButtons}
					onLeftActionRelease={leftActionRelease}
					rightButtonWidth={64}
					key={`todo-items-${index + 1}`}
				>
					<CheckBox
						style={done ? stylesTodoCard.completed : stylesTodoCard.main}
						text={name}
						checked={done}
						onChange={(e) => this.handleUpdateTodoStatusItem(e, id)}
					/>
				</Swipeable>
			);
		}) : 
		this.generateNoDataMessage();

		return todosElements;
	}

	generateNoDataMessage = () => {
		const { isAddingTodoElement } = this.state;
		return (
			!isAddingTodoElement && (
				<View
					style={{
						flexDirection: 'row',
						padding: 14,
						backgroundColor: '#fafafa'
					}}
				>
					<ListItem
						style={{
							flex: 7,
							backgroundColor: '#fafafa'
						}}
						title='No reminders yet'
						description='You can add a reminders using the button on the bottom'	
					/>
					<Button
						style={{
							width: 120,
							textAlign: 'center'
						}}
						onPress={this.handleToggleAddingTodo}
					>
						{'New note'}
					</Button>
				</View>
			)
		)
	}

	render() {
		const { isAddingTodoElement } = this.state;
		const addTodoInput = this.addTodoInput();
		const todosElements = this.getTodos();
		const FABAddTodo = (
			!isAddingTodoElement &&
			<TouchableOpacity
				style={stylesAddTodoButton.main}
				onPress={this.handleToggleAddingTodo}
			>
				<Icon
					name="ios-add"
					color="#fff"
					size={36}
				/>
			</TouchableOpacity>
		)

		return (
			<View style={stylesTodoList.main}>
				<View style={stylesAddTodoPromptWrapper.main}>
					{ addTodoInput }
				</View>
				<ScrollView style={styleContent.main}>
					{ todosElements }
				</ScrollView>
				{FABAddTodo}
			</View>
		);
	}
};

const stylesTodoList = StyleSheet.create({
    main: {
        flex: 1,
		margin: -14,
    }
});

const stylesTodoCard = StyleSheet.create({
    main: {
        marginTop: 14,
		marginBottom: 0,
		backgroundColor: '#f5f6fa',
		borderRadius: 8,
		padding: 21,
	},
	completed: {
        marginTop: 14,
		marginBottom: 0,
		backgroundColor: 'rgba(245, 246, 250, 0.4)',
		borderRadius: 8,
		padding: 21,
		opacity: 0.75,
	}
});

const styleContent = StyleSheet.create({
    main: {
      padding: 14,
    },
});

const styleTodoElement = StyleSheet.create({
    main: {
      	padding: 7,
		margin: 14,
		borderRadius: 7,
		padding: 14,
    }
});

const stylesAddTodoButton = StyleSheet.create({
    main: {
     	backgroundColor: '#196ffa',
		borderColor: '#196ffa',
		borderRadius: 50,
		height: 64, 
		width: 64,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 35,
		right: 35,
    },
	text: {
		color: 'white',
	}
});

const stylesAddTodoInputWrapper = StyleSheet.create({
	main: {
		flexDirection: 'row',
		alignItems: 'center',
	}
});

const stylesAddTodoInputButton = StyleSheet.create({
    main: {
      	backgroundColor: '#196ffa',
		borderColor: '#196ffa',
		borderRadius: 50,
		marginRight: 14,
		width: 46,
		height: 46,
		marginTop: 14,
		marginLeft: 8,
		marginBottom: 14,
		alignItems: 'center',
		justifyContent: 'center',
    },
	text: {
		color: 'white',
	}
});

const stylesCloseTodoInputButton = StyleSheet.create({
    main: {
      	backgroundColor: '#e74c3c',
		borderColor: '#e74c3c',
		borderRadius: 50,
		marginRight: 14,
		width: 46,
		height: 46,
		marginTop: 14,
		marginLeft: 4,
		marginBottom: 14,
		alignItems: 'center',
		justifyContent: 'center',
    },
	text: {
		color: 'white',
	}
});

const stylesAddTodoInput = StyleSheet.create({
	input: {
		margin: 14,
		marginTop: 14,
		marginBottom: 14,
		borderRadius: 50,
		flex: 1,
		flexDirection: 'row',
	}
});

const stylesAddTodoPromptWrapper = StyleSheet.create({
	main: {
		padding: 14,
		marginBottom: -28,
		marginTop: 14,
	}
})

const stylesDeleteTodoButton = StyleSheet.create({
    main: {
      	backgroundColor: '#e74c3c',
		borderColor: '#e74c3c',
		borderRadius: 50,
		height: 32,
		width: 32,
		left: -17,
		justifyContent: 'center',
		alignItems: 'center',
    },
	text: {
		color: 'white',
	}
});

const stylesEditTodoButton = StyleSheet.create({
    main: {
      	backgroundColor: '#4b7bec',
		borderColor: '#4b7bec',
		borderRadius: 50,
		height: 32,
		width: 32,
		left: -7,
		justifyContent: 'center',
		alignItems: 'center',
    },
	text: {
		color: 'white',
	}
});

const stylesTodoActionButtons = StyleSheet.create({
	main: {
		position: 'relative',
		left: 28,
		top: 28,
		width: 3,
	}
});

const stylesTodoActionSwipeLeft = StyleSheet.create({
	main: {
		backgroundColor: '#26de81',
		position: 'relative',
		height: 66,
		borderRadius: 8,
		borderColor: '#fff',
		borderWidth: 1,
		top: 14,
		right: 14,
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: 28,
		flexDirection: 'row',
	},
	label: {
		color: '#fff',
		marginLeft: 7,
		fontSize: 22,
	}
});

export default TodoList;