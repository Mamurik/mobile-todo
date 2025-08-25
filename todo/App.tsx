import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CreateTaskModal from './src/components/CreateTaskModal/CreateTaskModal'
import TaskInfo from './src/components/TaskInfo/TaskInfo'
import TaskList from './src/components/TaskList/TaskList'
import { ITask } from './src/types/types'

export default function App() {
	const [tasks, setTasks] = useState<ITask[]>([])
	const [modalVisible, setModalVisible] = useState(false)
	const [createModal, setCreateModal] = useState(false)
	const [selectedTask, setSelectedTask] = useState<ITask | null>(null)
	const [sortBy, setSortBy] = useState<'date' | 'status'>('date')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc') // По умолчанию по возрастанию

	useEffect(() => {
		loadTasks()
	}, [])

	const loadTasks = async () => {
		try {
			const storedTasks = await AsyncStorage.getItem('tasks')
			if (storedTasks) {
				const parsedTasks: ITask[] = JSON.parse(storedTasks).map(
					(task: ITask) => ({
						...task,
						date: new Date(task.date),
					})
				)
				setTasks(sortTasks(parsedTasks))
			}
		} catch (error) {
			Alert.alert('Ошибка', 'Не удалось загрузить задачи.')
		}
	}

	const saveTasks = async (newTasks: ITask[]) => {
		try {
			await AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
		} catch (error) {
			Alert.alert('Ошибка', 'Не удалось сохранить задачи.')
		}
	}

	const sortTasks = (tasks: ITask[]) => {
		const sortedTasks = [...tasks]
		if (sortBy === 'date') {
			sortedTasks.sort((a, b) => {
				return sortOrder === 'asc'
					? a.date.getTime() - b.date.getTime()
					: b.date.getTime() - a.date.getTime()
			})
		} else if (sortBy === 'status') {
			sortedTasks.sort((a, b) => {
				return sortOrder === 'asc'
					? a.status.localeCompare(b.status)
					: b.status.localeCompare(a.status)
			})
		}
		return sortedTasks
	}

	const onInfo = () => {
		setModalVisible(true)
	}

	const onDelete = (id: number) => {
		const updatedTasks = tasks.filter(task => task.id !== id)
		setTasks(updatedTasks)
		saveTasks(updatedTasks)
	}

	const changeStatus = (id: number, status: string) => {
		const updatedTasks = tasks.map(task =>
			task.id === id ? { ...task, status } : task
		)
		setTasks(updatedTasks)
		saveTasks(updatedTasks)
	}

	const addTask = (task: ITask) => {
		const updatedTasks = [...tasks, { ...task, date: new Date(task.date) }]
		setTasks(updatedTasks)
		saveTasks(updatedTasks)
	}

	const toggleDateSort = () => {
		setSortBy('date')
		setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))
	}

	const toggleStatusSort = () => {
		setSortBy('status')
		setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.addButton}
				onPress={() => setCreateModal(true)}
			>
				<Text style={styles.addButtonText}>+ Добавить задачу</Text>
			</TouchableOpacity>

			<View style={styles.sortContainer}>
				<TouchableOpacity style={styles.sortButton} onPress={toggleDateSort}>
					<Text style={styles.sortButtonText}>Сортировать по дате</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.sortButton} onPress={toggleStatusSort}>
					<Text style={styles.sortButtonText}>Сортировать по статусу</Text>
				</TouchableOpacity>
			</View>

			<TaskList
				changeStatus={changeStatus}
				onDelete={onDelete}
				onInfo={onInfo}
				tasks={sortTasks(tasks)}
				setTaskForInfo={setSelectedTask}
			/>

			{selectedTask && (
				<TaskInfo
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					task={selectedTask}
				/>
			)}

			<CreateTaskModal
				modalVisible={createModal}
				setModalVisible={setCreateModal}
				addTask={addTask}
			/>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: '#f5f6fa',
	},
	addButton: {
		backgroundColor: '#4e73df',
		margin: 15,
		padding: 15,
		borderRadius: 12,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	addButtonText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 18,
	},
	sortContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10,
	},
	sortButton: {
		backgroundColor: '#e2e6ea',
		padding: 10,
		borderRadius: 10,
	},
	sortButtonText: {
		fontSize: 14,
		color: '#2d2f33',
		fontWeight: '600',
	},
})
