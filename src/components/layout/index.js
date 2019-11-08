import React from "react";
import styles from "./style.module.scss";
class Layout extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                <div className={styles.appBar}>
                    <span>Football App</span>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </React.Fragment>
        );
    }
}

export default Layout;
