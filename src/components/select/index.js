import React from "react";
import styles from "./style.module.scss";
import TextField from "../textField"
class Select extends React.Component {
    state = { isOpen: false }
    render() {
        const {
            options,
            value,
            onChange,
            onBlur,
            placeholder
        } = this.props;
        const { isOpen } = this.state;
        return (
            <div className={styles.option}>
                <TextField
                    placeholder={placeholder}
                    type="text"
                    value={value}
                    onChange={() => { }}
                    onClick={() => this.setState({ isOpen: !isOpen })}
                ></TextField>
                {isOpen &&
                    <ul className={styles.optionList}>
                        {options.map(option =>
                            <li className={styles.optionListItem}
                                key={option.value}
                                onClick={(e) => {

                                    onChange(option.value);
                                    onBlur(e);
                                    this.setState({ isOpen: !isOpen });
                                }}
                            >{option.label}
                            </li>
                        )}
                    </ul>
                }
            </div>);

    }
}
export default Select;