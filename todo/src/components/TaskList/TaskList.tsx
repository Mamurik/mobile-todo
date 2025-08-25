import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ITask } from '../../types/types'
import TaskItem from '../TaskItem/TaskItem'

interface TaskListProps {
	tasks: ITask[]
	onDelete: (id: number) => void
	onInfo: (id: number) => void
	changeStatus: (id: number, status: string) => void
	setTaskForInfo: (task: ITask) => void
}

const TaskList: FC<TaskListProps> = ({
	tasks,
	onDelete,
	onInfo,
	changeStatus,
	setTaskForInfo,
}) => {
	if (tasks.length === 0) {
		return (
			<View style={styles.container}>
				<Text>Список задач пуст</Text>
			</View>
		)
	}
	return (
		<View>
			{tasks.map(task => (
				<TaskItem
					changeStatus={changeStatus}
					key={task.id}
					task={task}
					onInfo={() => onInfo(task.id)}
					onDelete={() => onDelete(task.id)}
					setTaskForInfo={setTaskForInfo}
				/>
			))}
		</View>
	)
}

export default TaskList

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
