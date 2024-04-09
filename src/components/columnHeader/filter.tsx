import { FunnelIcon } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconSolid } from '@heroicons/react/24/solid'
import { useRef, useState } from 'react'

import { FilterTypes } from '../../models/models'
import { useOutsideClick } from '../../hooks/useClickOutside'

type PropsType = {
  filter: FilterTypes
  disabled: boolean
  onHandleFilterChange: (value: FilterTypes) => void
}

function Filter(props: PropsType) {
  const {
    filter,
    disabled,
    onHandleFilterChange
  } = props
  const ref: any = useRef()
  const [isFilterMenuShown, setIsFilterMenuShown] = useState<boolean>(false)
  const GetIcon = filter === FilterTypes.All ? FunnelIcon : FunnelIconSolid

  useOutsideClick(ref, () => {
    setIsFilterMenuShown(false)
  }, [isFilterMenuShown])

  return (
    <div
      className={`filter ${disabled ? 'disabled' : ''}`}
      ref={ref}
    >
      <GetIcon
        className='icon'
        onClick={() => setIsFilterMenuShown(!isFilterMenuShown)}
      />
      {isFilterMenuShown &&
        <div className='filter-dropdown'>
          {Object.values(FilterTypes).map((value) => (
            <div
              key={value}
              className={`
                filter-dropdown-item 
                ${value === filter ? 'selected' : ''}
              `}
              onClick={() => {
                setIsFilterMenuShown(false)
                onHandleFilterChange(value)
              }}
            >
              {value}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Filter
