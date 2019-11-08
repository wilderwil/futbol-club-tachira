import React from "react";
import styles from "./style.module.scss";
const Button = (props) => {
    const { type, onClick, label, disabled } = props;
    const className = styles[type];
    return (
        <div
            className={`${className} ${disabled} ? styles.disabled: '' `}
            onClick={(e) => {
                if (disabled) {
                    return;
                }
                onClick(e);
            }}>
            {label}
        </div>
    );

}
Button.defaultProps = {
    type: "regular"
};
export default Button;