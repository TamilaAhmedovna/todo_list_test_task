export const highlightSearch = (str: string, searchValue: string) => {
    if (!str.includes(searchValue) || searchValue.length <= 1) {
      return [str]
    }

    const terms = str.split(searchValue)
    const firstIndex = 0
    const lastIndex = terms.length - 1
    const empty = ''

    const elements = terms.map((term, index) => {
      if (term === empty && index === firstIndex) {
        return <span key={index}></span>
      } else if (term === empty && index === lastIndex) {
        return <span key={index} className='highlighted'>{searchValue}</span>
      } else if (index === firstIndex) {
        return <span key={index}>{term}</span>
      } else {
        return (
          <span key={index}>
            <span className='highlighted'>{searchValue}</span>
            <span>{term}</span>
          </span>
        )
      }
    })

    return elements
  }