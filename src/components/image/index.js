import React from "react";
import styles from "./style.module.scss";
const Image = (props) => {
    const { ...rest } = props;
    return (<img className={styles.image}  {...rest} alt=''/>)
};
export default Image;