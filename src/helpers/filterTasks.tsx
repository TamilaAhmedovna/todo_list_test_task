import { 
  FilterTypes,
  TaskType, 
} from '../models/models'

export const filterTasks = (
  tasks: TaskType[],
  filter: FilterTypes
) => (
  tasks.filter(task => {
    switch (filter) {
      case FilterTypes.All:
        return task
      case FilterTypes.Completed:
        return task.isCompleted
      case FilterTypes.NotCompleted:
        return !task.isCompleted
    }
  })
)