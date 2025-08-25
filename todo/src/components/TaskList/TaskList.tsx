import React, { FC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
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
			<View style={styles.emptyContainer}>
				<Text style={styles.empty}> Список задач пуст</Text>
				<Text style={styles.emptySub}>
					Нажмите «Добавить задачу», чтобы создать первую
				</Text>
			</View>
		)
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
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
		</ScrollView>
	)
}

export default TaskList

const styles = StyleSheet.create({
	scrollContainer: {
		padding: 15,
		paddingBottom: 30,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	empty: {
		textAlign: 'center',
		color: '#6c757d',
		fontWeight: '700',
		fontSize: 20,
		marginBottom: 8,
	},
	emptySub: {
		textAlign: 'center',
		color: '#adb5bd',
		fontSize: 14,
	},
})
