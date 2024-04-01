import { useState, KeyboardEvent, ChangeEvent } from "react"

export type PropsType = {
  buttonName: string
  onAddItem: (name: string) => void
  onSetName?: (value: string) => void
}

function EntityCreation(props: PropsType) {
  const { buttonName, onAddItem, onSetName } = props
  const [name, setName] = useState('')

  const handleAddItem = () => {
    if (!name.length) return
    setName('')
    onAddItem(name)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    setName(value)
    if (onSetName) {
      onSetName(value)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return

    handleAddItem();
  }

  return (
    <div className='item-creation'>
      <input
        value={name}
        placeholder='Type name'
        onChange={handleNameChange}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleAddItem}
        disabled={!name.length}
      >
        {buttonName}
      </button>
    </div>
  )
}

export default EntityCreation
