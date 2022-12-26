import { useState } from 'react'

function DualComponent () {
  const [mode, setMode] = useState(false)

  return (
    <>
      {
        mode ? (
          <div>
            this is the true mode
            <input type='button' value='switch to false' onClick={evt => setMode(false)}/>
          </div>
        ) : (
          <div>
            this is the false mode
            <input type='button' value='switch to true' onClick={evt => setMode(true)}/>
          </div>
        )
      }
    </>
  )

}

export default DualComponent