export interface ITask {
	id: number
	title: string
	description: string
	date: Date
	time: string
	status: string
	location: string
}
export enum StatusEnum {
	'В процессе',
	'Завершено',
	'Отменено',
}
