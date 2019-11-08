import React from "react";
import Layout from "../../components/layout/index";
import { JugadorContext } from "../../context/jugador";
import styles from "./style.module.scss";
import Jugador from "../jugador/index";

class Page extends React.Component {
  state = { jugadorId: null }
  render() {
    const {
      jugadores
    } = this.context;
    const { jugadorId,isOpen } = this.state;
    const jugador = jugadores.find(n => n.id === jugadorId);

    return (
      <Layout>

        <div className={styles.content}>
          <div className={styles.buttonFloat} onClick={()=>{this.setState({isOpen:true,jugadorId:null})}}>+</div>
          <table className={styles.table} cellSpacing="0">
            <thead>
              <tr className={styles.tableHeader}>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Posicion</th>
                <th>Año</th>
                 
              </tr>
            </thead>
            <tbody >
              {jugadores.map(row => {
                return (<tr className={styles.tableRow}
                  key={row.id} onClick={() => this.setState({ jugadorId: row.id,isOpen:true })}>
                  <td><img src={row.photo}></img></td>
                  <td>{row.nombre}</td>
                  <td>{row.apellido}</td>
                  <td>{row.posicion}</td>
                  <td>{row.año}</td>
                  
                </tr>);
              })}



            </tbody>
          </table>

        </div>
        {isOpen && <Jugador jugador={jugador} onClose={()=>this.setState({jugadorId:null,isOpen:false})}/>}
      </Layout>
    );
  }
}
Page.contextType = JugadorContext;

export default Page;
