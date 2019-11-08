
import React from "react";

const ProgressFile = (props) => {
    const { ...rest } = props;
    console.log(rest);
    return (<progress   {...rest}></progress>)
};
export default ProgressFile;