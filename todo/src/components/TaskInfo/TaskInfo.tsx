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

					<View style={styles.infoBlock}>
						<Text style={styles.label}>📌 ID:</Text>
						<Text style={styles.value}>{task.id}</Text>
					</View>

					<View style={styles.infoBlock}>
						<Text style={styles.label}>📍 Локация:</Text>
						<Text style={styles.value}>{task.location}</Text>
					</View>

					<View style={styles.infoBlock}>
						<Text style={styles.label}>📅 Дата:</Text>
						<Text style={styles.value}>
							{new Date(task.date).toLocaleDateString()}
						</Text>
					</View>

					<View style={styles.infoBlock}>
						<Text style={styles.label}>🕒 Время:</Text>
						<Text style={styles.value}>{task.time}</Text>
					</View>

					<View style={styles.infoBlock}>
						<Text style={styles.label}>📝 Описание:</Text>
						<Text style={styles.value}>{task.description}</Text>
					</View>

					<View style={styles.infoBlock}>
						<Text style={styles.label}>✅ Статус:</Text>
						<Text style={styles.value}>{task.status}</Text>
					</View>

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
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	taskContainer: {
		width: '85%',
		padding: 20,
		borderRadius: 15,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 6,
		elevation: 6,
	},
	taskTitle: {
		textAlign: 'center',
		color: '#2d2f33',
		fontWeight: '700',
		fontSize: 22,
		marginBottom: 15,
	},
	infoBlock: {
		flexDirection: 'row',
		marginBottom: 8,
	},
	label: {
		fontWeight: '600',
		color: '#555',
		marginRight: 5,
	},
	value: {
		color: '#333',
		flexShrink: 1,
	},
	closeButton: {
		marginTop: 20,
		backgroundColor: '#4e73df',
		padding: 12,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
	},
})
