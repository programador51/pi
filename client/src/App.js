import "./scss/main.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './pages/Login/Login';
import Manage from './pages/Manage/Manage';
import Inventory from './pages/Inventory/Inventory';
import Refactions from './pages/Refactions/Refactions';
import Moves from './pages/Moves/Moves';
import UtilitiesState from './context/View/ViewState';

function App() {
  return (
    <>
      <UtilitiesState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/gestion" component={Manage} />
            <Route exact path="/inventario" component={Inventory} />
            <Route exact path="/refacciones" component={Refactions} />
            <Route exact path="/movimientos" component={Moves} />
          </Switch>
        </Router>
      </UtilitiesState>

    </>
  );
}

export default App;
