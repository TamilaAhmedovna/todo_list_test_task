import { TrashIcon } from '@heroicons/react/24/outline'

type PropsType = {
  name: string
  onRemoveColumn: () => void
}

function ColumnProps(props: PropsType) {
  const {
    name,
    onRemoveColumn,
    ...dndProps
  } = props

  return (
    <div className='column-props' {...dndProps}>
      <div className='column-name'>{name}</div>
      <TrashIcon
        className='icon'
        onClick={onRemoveColumn}
      />
    </div>
  )
}

export default ColumnProps
