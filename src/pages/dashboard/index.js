import React from "react";
import Nomina from "../nomina/";
import Team from "../team/team";
//import ReactDOM from "react-dom";
//import styles from "./style.module.scss";


class Page extends React.Component {
   
    render() {
      return <React.Fragment >
                <Nomina></Nomina>  
                <Nomina></Nomina> 
                <Team ></Team>
       </React.Fragment>
    }
  }
  export default Page;