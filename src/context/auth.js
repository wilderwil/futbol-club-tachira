import { watchUserChanges } from "../services/firebase";
import React from "react";
export const AuthContext = React.createContext();
export const AuthContextConsumer = AuthContext.Consumer;
export class AuthContextProvider extends React.Component {
  state = {
    authReady: false,
    isLoggedIn: false,
    user: null
  };
  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{
          ...this.state
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  componentDidMount() {
    watchUserChanges(user => {
      if (user) {
        this.setState({
          authReady: true,
          isLoggedIn: true,
          user
        });
      } else {
        this.setState({
          authReady: true,
          isLoggedIn: false,
          user: null
        });
      }
    });
  }
}
