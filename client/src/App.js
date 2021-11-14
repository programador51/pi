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
import Despatch from './pages/Despatch/Despatch';
import Forbidden from './pages/Forbidden/Forbidden'

import UtilitiesState from './context/View/ViewState';
import { Ticket } from "./pages/Tickets/Tickets";
import ListTickets from "./pages/ListTickets/ListTickets";
import { Ticket as TicketInfo } from './pages/Ticket/Ticket';
import PDF from "./pages/Manage/PDF";

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
            <Route exact path="/despacho" component={Despatch} />
            <Route exact path="/bloqueo" component={Forbidden} />
            <Route exact path="/tickets" component={Ticket} />
            <Route exact path="/tickets/ver" component={ListTickets} />
            <Route exact path="/tickets/ver/:idTicket" component={TicketInfo} />
            <Route exact path="/pdf" component={PDF} />
          </Switch>
        </Router>
      </UtilitiesState>

    </>
  );
}

export default App;
