import React from "react";
import Select from "../../components/select";
import { watchEquipo, watchUserChanges } from "../../services/firebase/watcher";

//import styles from "./style.module.scss";


class Page extends React.Component {

  state = {
    equipos: []
  };
  componentDidMount() {
    watchUserChanges((user) => {
      if (user) {
        watchEquipo(equipos => {
          console.log("wacth: ",equipos);
          this.setState({ equipos });

        });
      }
    });
    console.log("Equipo: ",this.equipos)
  }
   
    render() {
      const {equipos}=this.state;
      return <React.Fragment >
          <Select options=
                      {equipos.map(item =>{
                        return <option key={item.id} value={item.año}>{item.descripcion}</option>
                      })}
                       placeholder="Año"
                      name="año"/>
       </React.Fragment>
    }
  }
  export default Page;