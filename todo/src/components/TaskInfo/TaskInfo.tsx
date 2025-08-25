import React, { FC } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ITask } from '../../types/types'

interface TaskInfoProps {
	modalVisible: boolean
	setModalVisible: (visible: boolean) => void
	task: ITask
}

const TaskInfo: FC<TaskInfoProps> = ({
	modalVisible,
	setModalVisible,
	task,
}) => {
	return (
		<Modal
			onRequestClose={() => setModalVisible(false)}
			transparent={true}
			visible={modalVisible}
			animationType='fade'
		>
			<View style={styles.modalBackground}>
				<View style={styles.taskContainer}>
					<Text style={styles.taskTitle}>{task.title}</Text>
					<Text style={styles.taskDesc}>Id: {task.id}</Text>
					<Text style={styles.taskDesc}>Локация: {task.location}</Text>
					<Text style={styles.taskDesc}>
						Дата: {new Date(task.date).toLocaleDateString()}
					</Text>
					<Text style={styles.taskDesc}>Время: {task.time}</Text>
					<Text style={styles.taskDesc}>Описание: {task.description}</Text>
					<Text style={styles.taskDesc}>✅ Статус: {task.status}</Text>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => setModalVisible(false)}
					>
						<Text style={styles.buttonText}>Закрыть</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

export default TaskInfo

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	taskContainer: {
		margin: 20,
		padding: 30,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	taskTitle: {
		textAlign: 'center',
		color: '#333',
		fontWeight: '700',
		fontSize: 22,
		marginBottom: 10,
	},
	taskDesc: {
		textAlign: 'left',
		color: '#555',
		fontWeight: '400',
		fontSize: 16,
		marginBottom: 5,
	},
	closeButton: {
		marginTop: 15,
		backgroundColor: '#007bff',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
	},
})
