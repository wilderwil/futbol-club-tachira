import { watchJugador, watchUserChanges } from "../services/firebase";
import React from "react";

export const JugadorContext = React.createContext();
export class JugadorContextProvider extends React.Component {
  state = {
    jugadores: []
  };
  render() {
    return (
      <JugadorContext.Provider value={this.state}>
        {this.props.children}
      </JugadorContext.Provider>
    );
  }

  componentDidMount() {
    watchUserChanges((user) => {
      if (user) {
        watchJugador(jugadores => {
          this.setState({ jugadores });

        });
      }
    });
  }
}
export const JugadorContextConsumer = JugadorContext.JugadorContextConsumer;
