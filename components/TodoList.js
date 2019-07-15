import React, { Component } from 'react';
import * as Expo from 'expo';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { Layout, CheckBox, Input, Button } from 'react-native-ui-kitten';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Text } from 'react-native-paper';
import Swipeable from 'react-native-swipeable-row';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFR from 'react-native-vector-icons/Feather';

import Divider from './Divider';

class TodoList extends Component {
	state = { 
		isAddingTodoElement: true,
	};

	leftContent = (
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
	);
 
	rightButtons = [
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
			>
				<Icon
					name="ios-close"
					color="#fff"
					size={36}
				/>
			</TouchableOpacity>
		</View>,
	];

	handleToggleAddingTodo = () => {
		const { isAddingTodoElement } = this.state;
		this.setState({
			isAddingTodoElement: !isAddingTodoElement,
		});

	}

	addTodoInput = () => {
		const { isAddingTodoElement } = this.state;
		const addTodoInput = (
			isAddingTodoElement &&
			<SimpleAnimation
				direction="down"
				duration={1000}
				distance={12}
				movementType="slide"
			>
				<Text style={stylesAddTodoPrompt.main}>
					Add your reminder
				</Text>
				<View style={stylesAddTodoInputWrapper.main}>
					<Input placeholder="Enter your reminder" size="medium" style={stylesAddTodoInput.input} />
					<TouchableOpacity
						style={stylesAddTodoInputButton.main}
						>
						<Icon
							name="ios-checkmark"
							color="#fff"
							size={36}
						/>
					</TouchableOpacity>
				</View>
			</SimpleAnimation>
		);

		return addTodoInput;
	}

	render() {
		const { isAddingTodoElement } = this.state;
		const addTodoInput = this.addTodoInput();

		return (
			<View style={stylesTodoList.main}>
				<View style={stylesAddTodoPromptWrapper.main}>
					{ addTodoInput }
				</View>
				<ScrollView style={styleContent.main}>
					<Swipeable
						leftContent={this.leftContent}
						rightButtons={this.rightButtons}
						rightButtonWidth={64}
					>
						<CheckBox
							style={stylesTodoCard.main}
							text='Place your text'
							checked
						/>
					</Swipeable>
				</ScrollView>
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
		marginBottom: 14,
		backgroundColor: '#f5f6fa',
		borderRadius: 8,
		padding: 21,
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
		shadowOffset: {
			width: 1,
			height: 1
		},
		shadowOpacity: 0.08,
		shadowRadius: 10.41,
		elevation: 2
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
				shadowOffset: {
				width: 1,
				height: 1
			},
			shadowOpacity: 0.38,
			shadowRadius: 10.41,
			elevation: 2
    },
	text: {
		color: 'white',
	}
});

const stylesAddTodoInputWrapper = StyleSheet.create({
	main: {
		flexDirection: 'row',
	}
});

const stylesAddTodoInputButton = StyleSheet.create({
    main: {
		flex: 1,
      	backgroundColor: '#196ffa',
		borderColor: '#196ffa',
		borderRadius: 5,
		marginRight: 14,
		marginTop: 14,
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
		flex: 6,
		flexDirection: 'row',
	}
});

const stylesAddTodoPrompt = StyleSheet.create({
	main: {
		opacity: 0.8,
		paddingLeft: 14,
		paddingRight: 14,
		marginBottom: 0,
		marginTop: 14,
		fontWeight: '100',
		fontSize: 28, 
	}
});

const stylesAddTodoPromptWrapper = StyleSheet.create({
	main: {
		padding: 14,
		marginBottom: -28,
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