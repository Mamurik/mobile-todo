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
		padding: 20,
		borderRadius: 12,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	taskTitle: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 10,
		color: '#2d2f33',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	deleteButton: {
		backgroundColor: '#e74a3b',
		padding: 10,
		borderRadius: 8,
		flex: 1,
		marginRight: 5,
		alignItems: 'center',
	},
	infoButton: {
		backgroundColor: '#4e73df',
		padding: 10,
		borderRadius: 8,
		flex: 1,
		marginLeft: 5,
		alignItems: 'center',
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
		alignItems: 'flex-start',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
	},
	taskDesc: {
		textAlign: 'left',
		color: '#555',
		fontWeight: '400',
		fontSize: 16,
		marginBottom: 5,
	},
})
