import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main'
import Item from './Item'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Main />
        </Route>
        <Route path='/:item' exact>
          <Item />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
