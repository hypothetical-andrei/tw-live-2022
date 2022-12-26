import { useState } from 'react'
import UpdateChild from './UpdateChild'

function UpdateParent () {
    const [id, setId] = useState(1)

    const handleBlur = (evt) => {
        setId(evt.target.value)
    }

    return (
        <>
            <div>
                <input type='text' onBlur={handleBlur} />
            </div>
            <div>
                <UpdateChild item={id} />
            </div>
        </>
    )
  }
  
  export default UpdateParent
  