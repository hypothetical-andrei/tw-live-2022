import { useState } from 'react'
import LiftingChild from './LiftingChild'

function LiftingParent () {
    const [data, setData] = useState([{
        description: 'test1',
        id: 1
      },{
        description: 'test2',
        id: 2
      },{
        description: 'test3',
        id: 3
      }])

    const updateParent = (id, description) => {
        const modifiedData = data
        const index = modifiedData.findIndex(e => e.id === id)
        modifiedData[index].description = description
        setData([...modifiedData])
    }

    return (
        <div>
            <div>
                <h3>state in parent</h3>
                {
                    data.map(e => <div key={e.id}>{e.description}</div>)
                }
            </div>
            <div>
                <h3>children</h3>
                {
                    data.map(e => <LiftingChild key={e.id} item={e} onParentUpdate={updateParent} />)
                }
            </div>
        </div>
    )
} 

export default LiftingParent
