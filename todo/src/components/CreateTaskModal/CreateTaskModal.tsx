import React, { FC, useState } from 'react'
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { ITask, StatusEnum } from '../../types/types'

interface CreateTaskModalProps {
	modalVisible: boolean
	setModalVisible: (visible: boolean) => void
	addTask: (task: ITask) => void
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({
	modalVisible,
	setModalVisible,
	addTask,
}) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [location, setLocation] = useState('')
	const [date, setDate] = useState(new Date())
	const [time, setTime] = useState('00')

	const handleSubmit = () => {
		const newTask: ITask = {
			id: Math.random(), // Используем случайный ID
			title,
			description,
			location,
			date,
			time,
			status: StatusEnum[0], // Начальный статус
		}
		addTask(newTask)
		setModalVisible(false) // Закрываем модалку
		// Сбрасываем поля
		setTitle('')
		setDescription('')
		setLocation('')
		setDate(new Date())
		setTime('00')
	}

	return (
		<Modal transparent={true} visible={modalVisible} animationType='slide'>
			<View style={styles.modalBackground}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>Создать новую задачу</Text>

					<TextInput
						style={styles.input}
						placeholder='Название'
						value={title}
						onChangeText={setTitle}
					/>
					<TextInput
						style={styles.input}
						placeholder='Описание'
						value={description}
						onChangeText={setDescription}
					/>
					<TextInput
						style={styles.input}
						placeholder='Локация'
						value={location}
						onChangeText={setLocation}
					/>
					<TextInput
						style={styles.input}
						placeholder='Дата (YYYY-MM-DD)'
						value={date.toISOString().split('T')[0]}
						onChangeText={text => setDate(new Date(text))}
					/>
					<TextInput
						style={styles.input}
						placeholder='Время (HH:MM)'
						value={time}
						onChangeText={setTime}
					/>

					<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Создать задачу</Text>
					</TouchableOpacity>
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

export default CreateTaskModal

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContainer: {
		width: '80%',
		padding: 20,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		padding: 10,
		marginBottom: 15,
	},
	submitButton: {
		backgroundColor: '#007bff',
		padding: 15,
		borderRadius: 5,
		alignItems: 'center',
	},
	closeButton: {
		marginTop: 10,
		backgroundColor: 'red',
		padding: 15,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
	},
})
