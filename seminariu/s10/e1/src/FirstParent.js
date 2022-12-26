import { useState } from 'react'
import FirstChild from './FirstChild'

function FirstParent () {
  const [globalCounter, setGlobalCounter] = useState(0)
  const names = ['a', 'b', 'c']

  const increaseCounter = () => {
    setGlobalCounter(globalCounter + 1)
  }

  return (
    <>

      The current value of the counter is {globalCounter}
      {names.map(e => <FirstChild childName={e} increase={increaseCounter} />)}
    </>
  )

}

export default FirstParent