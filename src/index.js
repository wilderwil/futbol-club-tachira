import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import { AuthContextProvider } from "./context/auth";
import { JugadorContextProvider } from "./context/jugador";
import Reports from "./pages/report"
import Root from "./components/root";
import GuardRoute from "./components/guardRoute";
import "./styles.scss";
import 'react-vis/dist/style.css'; 

const root = (
  <BrowserRouter>
    <AuthContextProvider>
      <JugadorContextProvider>
        <Root>
          <Switch>
            <GuardRoute
              type="private"
              path="/dashboard"
              component={Dashboard}
            />
            <GuardRoute type="public" path="/login" component={Login} />
            <GuardRoute type="public" path="/report" component={Reports} />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Root>
      </JugadorContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
ReactDOM.render(root, document.getElementById("root"));

//ReactDOM.render(root, document.getElementById("root"));
