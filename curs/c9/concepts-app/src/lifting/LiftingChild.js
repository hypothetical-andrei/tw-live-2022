import { useState } from 'react'

function LiftingChild (props) {
    const { item, onParentUpdate } = props
    const [description, setDescription] = useState(item.description)

    const handleClick = (evt) => {
        onParentUpdate(item.id, description)
    }

    return (
        <div>
            i have id {item.id} description in child is
            <input type='text' value={description} onChange={(evt) => setDescription(evt.target.value)} />
            <input type='button' value='update' onClick={handleClick} />
        </div>
    )
  }
  
  export default LiftingChild
  