import React from "react";
import { AuthContext } from "../context/auth";
import { Route, Redirect } from "react-router-dom";

class GuardRoute extends React.Component {
  render() {
    const { type, ...rest } = this.props;
    const { isLoggedIn } = this.context;

    if (type === "private" && !isLoggedIn) {
      return <Redirect to="/login" />;
    } else if (type === "public" && isLoggedIn) {
      return <Redirect to="/nomina" />;
    }

    return <Route {...rest} />;
  }
}
GuardRoute.contextType = AuthContext;
export default GuardRoute;
