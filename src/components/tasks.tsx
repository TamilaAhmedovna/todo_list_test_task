import { TaskType } from '../models/models'
import Task from './task'

type PropsType = {
  tasks: TaskType[]
  onRemoveTask: (id: number) => void
  onCompleteChanged: (id: number, isCompleted: boolean) => void
}

function Tasks(props: PropsType) {
  const { tasks, onRemoveTask, onCompleteChanged } = props

  return (
    <div className='tasks'>
      {tasks.map(({ id, name, isCompleted }) => (
        <Task
          key={id}
          id={id}
          name={name}
          isCompleted={isCompleted}
          onRemoveTask={onRemoveTask}
          onCompleteChanged={onCompleteChanged}
        />
      ))}
    </div>
  )
}

export default Tasks
