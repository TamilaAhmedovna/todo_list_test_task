
export type ColumnType = {
    id: string
    name: string
    tasks: TaskType[]
}

export type TaskType = {
    id: string
    name: string
    isCompleted: boolean
}

export type TaskFilterTypes = 'All' | 'Completed' | 'Not completed'
export const filterAll: TaskFilterTypes = 'All'
export const filterCompleted: TaskFilterTypes = 'Completed'
export const filterNotCompleted: TaskFilterTypes = 'Not completed'

export const taskFilters: TaskFilterTypes[] = [filterAll, filterCompleted, filterNotCompleted]
