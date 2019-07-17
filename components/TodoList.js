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
import IconENT from 'react-native-vector-icons/Entypo';

import Divider from './Divider';

class TodoList extends Component {
	state = { 
		isAddingTodoElement: false,
		todoContentToAdd: '',
		todoElementToEdit: {
			isEdit: false,
			id: null,
			content: null,
		}
	};
	
	swipeable = [];
	editTodoItemInput = null;
	addTodoInputRef = null;

	swipeableRecenter = (id) => {
		id ?
		this.swipeable.filter(x => x.id !== id).map(x => x.method.recenter()) :
		this.swipeable.map(x => x.method.recenter());
	}

	swipeableEditFocus = () => {
		this.swipeableRecenter();
	}

	generateTodoId = function *() {
		const id = `0x${Math.random().toString(16).substr(2, 18)}`;
		while (true) {
			yield id;
		}
	}

	handleToggleAddingTodo = () => {
		const { isAddingTodoElement } = this.state;

		if (isAddingTodoElement) this.addTodoInputRef.focus();
		this.setState({
			isAddingTodoElement: !isAddingTodoElement,
		});
		this.swipeableRecenter();
	}

	handleAddTodoItem = () => {
		const { todoContentToAdd } = this.state;
		const { addTodoItem } = this.props;
		const todoId = this.generateTodoId().next().value;
		if (!todoContentToAdd) return ;

		addTodoItem({
			name: todoContentToAdd,
			done: false,
			id: todoId,
		});

		this.setState({
			todoContentToAdd: '',
		})

		this.swipeableRecenter();
	}
	
	handleUpdateTodoStatusItem = (checked, id, name) => {
		const { updateTodoItem } = this.props;
		updateTodoItem({ done: checked, id, name });
		this.swipeableRecenter();
	}

	toggleUpdateTodoElement = (id, fromBlur, name) => {
		const { todoElementToEdit } = this.state;

		this.setState({
			todoElementToEdit: {
				isEdit: !todoElementToEdit.isEdit,
				id: todoElementToEdit.isEdit ? null : id,
				content: name,
			}
		});

		if (fromBlur) this.handleUpdateTodoElement(name);

		this.swipeableEditFocus();
	}

	handleUpdateTodoElementContent = (content) => {
		this.setState({
			todoElementToEdit: {
				...this.state.todoElementToEdit,
				content,
			}
		});
	}

	handleUpdateTodoElement = (name) => {
		const { id, content } = this.state.todoElementToEdit;
		const { updateTodoItem } = this.props;

		updateTodoItem({ name: content || name, id, done: false });
		this.setState({
			todoElementToEdit: {
				id: null,
				content: null,
			}
		});
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

		const handleDeleteTodoItem = () => {
			this.swipeableRecenter();
			this.swipeable = this.swipeable.filter(x => x.id !== id);

			deleteTodoItem(id);
		}

		const handleEditTodoItem = () => this.toggleUpdateTodoElement(id);

		return (
			[
				<View style={stylesTodoActionButtons.main}>
					<TouchableOpacity
						style={stylesEditTodoButton.main}
						onPress={handleEditTodoItem}
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

		const isTodoAddInputIsEmpty = !todoContentToAdd.length;
		const swipeableRecenter = this.swipeableRecenter();

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
						ref={ref => this.addTodoInputRef = ref}
						placeholder="Enter your reminder"
						size="medium" 
						value={todoContentToAdd}
						style={stylesAddTodoInput.input}
						onChangeText={this.handleAddTodoItemContent}
						onFocus={swipeableRecenter}
						onBlur={this.handleAddTodoItem}
					/>
					<TouchableOpacity
						style={
							isTodoAddInputIsEmpty ? 
							stylesAddTodoInputButton.disabled :
							stylesAddTodoInputButton.main
						}
						onPress={this.handleAddTodoItem}
						disabled={isTodoAddInputIsEmpty}
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
						<IconENT
							name="chevron-thin-right"
							color="#fff"
							size={16}
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
		const { isEdit, id, content } = this.state.todoElementToEdit;
		const idTodoItemToEdit = id;
		const feed = todoItems();
	
		const todosElements = feed && feed.length ?
		feed.sort((x, y) => x.done - y.done).map((elem, index) => {
			const { name, done, id } = elem;
			const actionButtons = this.generateActionButton(elem);
			const leftContent = this.generateSwipeLeftAction(elem);
			const leftActionRelease = () => this.handleUpdateTodoStatusItem(!done, id, name);
			const rightActionRelease = () => this.swipeableRecenter(id);
			const onBlurActionEditTodoItem = () => this.toggleUpdateTodoElement(id, true, name);

			const todoItem = (
				!(isEdit && idTodoItemToEdit === id) ?
				<View style={{ opacity: done ? 0.25 : 1 }}>
					<CheckBox
						style={stylesTodoCard.main}
						textStyle={done ? stylesTodoCard.contentDone : stylesTodoCard.content}
						text={name}
						checked={done}
						onChange={(e) => this.handleUpdateTodoStatusItem(e, id, name)}
					/>
				</View> :
				<View style={stylesTodoCard.element}>
					<Input 
						ref={ref => {
							this.editTodoItemInput = ref;
							this.editTodoItemInput && this.editTodoItemInput.focus();
						}}
						placeholder="Edit your reminder"
						size="medium" 
						style={{ width: '100%', margin: -14, marginTop: -8, marginLeft: 0, marginRight: 0, borderRadius: 50 }}
						defaultValue={name}
						onChangeText={(e) => this.handleUpdateTodoElementContent(e)}
						onBlur={onBlurActionEditTodoItem}
					/>
				</View>
			);

			return (
				<Swipeable
					onRef={
						ref => 
						this.swipeable = [
							...this.swipeable,
							{
								method: ref,
								id,
						}]
					}
					leftContent={leftContent}
					rightButtons={actionButtons}
					onLeftActionRelease={leftActionRelease}
					onRightActionRelease={rightActionRelease}
					rightButtonWidth={64}
					key={`todo-items-${index + 1}`}
				>
					{ todoItem }
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
	content: {
		textDecorationLine: 'none',
		fontSize: 18,
		flexShrink: 1,
		marginLeft: 14,
		fontWeight: '100',
	},
    contentDone: {
		textDecorationLine: 'line-through',
		fontSize: 18,
		flexShrink: 1,
		marginLeft: 14,
		fontWeight: '100',
	},
	main: {
		position: 'relative',
        marginTop: 14,
		zIndex: 2,
		marginBottom: 0,
		backgroundColor: 'rgba(245, 246, 250, 0.4)',
		borderRadius: 8,
		padding: 21,
		opacity: 1,
	},
	element: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
        marginTop: 14,
		zIndex: 2,
		marginBottom: 0,
		backgroundColor: 'rgba(245, 246, 250, 0.65)',
		borderRadius: 8,
		padding: 21,
		opacity: 1,
	}
});

const styleContent = StyleSheet.create({
    main: {
		marginTop: -14,
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
	disabled: {
		opacity: 0.2,
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
		marginBottom: 0,
		marginTop: 0,
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
		position: 'absolute',
		flexDirection: 'row',
		backgroundColor: '#26de81',
		height: 68,
		borderRadius: 10,
		flex: 1,
		width: '100%',
		borderColor: '#fff',
		borderWidth: 1,
		top: 13,
		right: 14,
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: 28,
	},
	label: {
		color: '#fff',
		marginLeft: 7,
		fontSize: 22,
	}
});

export default TodoList;