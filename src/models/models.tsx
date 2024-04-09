
export type ColumnType = {
    id: string
    name: string
    tasks: TaskType[]
}

export type TaskType = {
    id: string
    name: string
    isCompleted: boolean
    isSelected?: boolean
}

export enum FilterTypes {
    All = 'All',
    Completed = 'Completed',
    NotCompleted = 'NotCompleted'
}
