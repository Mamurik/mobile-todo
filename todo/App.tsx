import { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import CreateTaskModal from './src/components/CreateTaskModal/CreateTaskModal' // Импортируем CreateTaskModal
import TaskInfo from './src/components/TaskInfo/TaskInfo'
import TaskList from './src/components/TaskList/TaskList'
import { ITask, StatusEnum } from './src/types/types'

export default function App() {
	const [tasks, setTasks] = useState<ITask[]>([
		{
			id: 1,
			date: new Date(),
			description: 'assd',
			time: '1212',
			status: StatusEnum[0],
			title: 'Alex',
			location: 'Gomel',
		},
	])

	const [modalVisible, setModalVisible] = useState(false)
	const [createModal, setCreateModal] = useState(false)
	const [selectedTask, setSelectedTask] = useState<ITask | null>(null)

	const onInfo = () => {
		setModalVisible(true)
	}

	const onDelete = (id: number) => {
		setTasks(prev => prev.filter(task => task.id !== id))
	}

	const changeStatus = (id: number, status: string) => {
		setTasks(prev =>
			prev.map(task => (task.id === id ? { ...task, status } : task))
		)
	}

	const addTask = (task: ITask) => {
		setTasks(prev => [...prev, task])
	}

	return (
		<View style={styles.container}>
			<Button title='Добавить задачу' onPress={() => setCreateModal(true)} />
			<TaskList
				changeStatus={changeStatus}
				onDelete={onDelete}
				onInfo={onInfo}
				tasks={tasks}
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
		backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
