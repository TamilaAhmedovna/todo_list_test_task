import { useState } from "react"

export type PropsType = {
  buttonName: string
  onAddItem: (name: string) => void
}

function ItemCreation(props: PropsType) {
  const [name, setName] = useState('')

  const handleAddItem = () => {
    if (!name.length) return
    setName('')
    props.onAddItem(name)
  }

  return (
    <div className='item-creation'>
      <input
        value={name}
        placeholder='Type name'
        onChange={(e) => setName(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleAddItem();
        }}
      />
      <button 
        onClick={handleAddItem}
        disabled={!name.length}
      >
        {props.buttonName}
      </button>
    </div>
  )
}

export default ItemCreation
