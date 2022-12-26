import StateExample from './state/StateExample'
import PropsParent from './props/PropsParent'
import UpdateParent from './update/UpdateParent'
import LiftingParent from './lifting/LiftingParent'

function App() {
  return (
    <div>
      <h3>state</h3>
      <StateExample />
      <h3>props</h3>
      <PropsParent />
      <h3>update</h3>
      <UpdateParent />
      <h3>lifting</h3>
      <LiftingParent />
    </div>
  )
}

export default App
