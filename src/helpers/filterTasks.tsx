import { 
  TaskFilterTypes, 
  TaskType, 
  filterAll, 
  filterCompleted, 
  filterNotCompleted 
} from '../models/models'

export const filterTasks = (
  tasks: TaskType[],
  filter: TaskFilterTypes
) => (
  tasks.filter(task => {
    switch (filter) {
      case filterAll:
        return task
      case filterCompleted:
        return task.isCompleted
      case filterNotCompleted:
        return !task.isCompleted
    }
  })
)