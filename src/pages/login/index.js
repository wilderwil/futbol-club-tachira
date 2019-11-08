import React from "react";
import { startUi } from "../../services/firebase";
class Page extends React.Component {
  componentDidMount() {
    startUi("#firebaseUi");
  }
  render() {
    return <div id="firebaseUi" />;
  }
}
export default Page;
