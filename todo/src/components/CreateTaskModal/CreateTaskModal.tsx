import DateTimePicker from '@react-native-community/datetimepicker'
import React, { FC, useState } from 'react'
import {
	Alert,
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
	const [time, setTime] = useState('00:00')
	const [showDatePicker, setShowDatePicker] = useState(false)

	const validateInput = () => {
		if (!title || !description || !location || !time) {
			Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.')
			return false
		}

		const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/
		if (!timeRegex.test(time)) {
			Alert.alert('Ошибка', 'Введите время в формате HH:MM.')
			return false
		}

		return true
	}

	const handleSubmit = () => {
		if (!validateInput()) return

		const newTask: ITask = {
			id: Date.now(),
			title,
			description,
			location,
			date,
			time,
			status: StatusEnum[0],
		}
		addTask(newTask)
		setModalVisible(false)

		// сброс
		setTitle('')
		setDescription('')
		setLocation('')
		setDate(new Date())
		setTime('00:00')
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
					<TouchableOpacity onPress={() => setShowDatePicker(true)}>
						<TextInput
							style={styles.input}
							placeholder='Дата (YYYY-MM-DD)'
							value={date.toISOString().split('T')[0]}
							editable={false}
						/>
					</TouchableOpacity>
					{showDatePicker && (
						<DateTimePicker
							value={date}
							mode='date'
							display='default'
							onChange={(event, selectedDate) => {
								setShowDatePicker(false)
								if (selectedDate) setDate(selectedDate)
							}}
						/>
					)}

					<TextInput
						style={styles.input}
						placeholder='Время (HH:MM)'
						value={time}
						onChangeText={setTime}
						maxLength={5}
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
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContainer: {
		width: '85%',
		padding: 20,
		borderRadius: 15,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 6,
		elevation: 6,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 15,
		textAlign: 'center',
		color: '#2d2f33',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ced4da',
		borderRadius: 10,
		padding: 12,
		marginBottom: 12,
		backgroundColor: '#f8f9fa',
	},
	submitButton: {
		backgroundColor: '#1cc88a',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 5,
	},
	closeButton: {
		marginTop: 10,
		backgroundColor: '#e74a3b',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 16,
	},
})
