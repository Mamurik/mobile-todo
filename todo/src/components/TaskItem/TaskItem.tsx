import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ITask, StatusEnum } from '../../types/types'

interface TaskItemProps {
	onDelete: () => void
	onInfo: () => void
	changeStatus: (id: number, status: string) => void
	task: ITask
	setTaskForInfo: (task: ITask) => void
}

const TaskItem: FC<TaskItemProps> = ({
	onDelete,
	onInfo,
	task,
	changeStatus,
	setTaskForInfo,
}) => {
	const getStatusStyle = (status: string) => {
		switch (status) {
			case StatusEnum[0]:
				return { backgroundColor: '#fff3cd' } // жёлтый
			case StatusEnum[1]:
				return { backgroundColor: '#d4edda' } // зелёный
			case StatusEnum[2]:
				return { backgroundColor: '#f8d7da' } // красный
			default:
				return { backgroundColor: '#eee' }
		}
	}

	return (
		<View style={[styles.taskContainer, getStatusStyle(task.status)]}>
			<Text style={styles.taskTitle}>{task.title}</Text>
			<Text style={styles.taskDesc}>📍 Локация: {task.location}</Text>
			<Text style={styles.taskDesc}>
				📅 Дата: {new Date(task.date).toLocaleDateString()}
			</Text>
			<Text style={styles.taskDesc}>🕒 Время: {task.time}</Text>
			<TouchableOpacity
				style={styles.statusContainer}
				onPress={() => {
					const newStatus =
						task.status === StatusEnum[0]
							? StatusEnum[1]
							: task.status === StatusEnum[1]
							? StatusEnum[2]
							: StatusEnum[0]
					changeStatus(task.id, newStatus)
				}}
			>
				<Text style={styles.taskStatus}>✅ Статус: {task.status}</Text>
			</TouchableOpacity>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
					<Text style={styles.buttonText}>Удалить</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.infoButton}
					onPress={() => {
						setTaskForInfo(task)
						onInfo()
					}}
				>
					<Text style={styles.buttonText}>Подробнее</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default TaskItem

const styles = StyleSheet.create({
	taskContainer: {
		margin: 10,
		padding: 30,
		borderRadius: 10,
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
	taskStatus: {
		textAlign: 'left',
		color: '#4caf50',
		width: 200,
		fontWeight: '700',
		fontSize: 18,
	},
	statusContainer: {
		padding: 5,
		marginBottom: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
	},
	deleteButton: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 5,
		marginVertical: 5,
		alignItems: 'center',
	},
	infoButton: {
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 5,
		marginVertical: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
	},
})
