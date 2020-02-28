import React, { Compoent } from 'react';
import '../../assets/style/statusTags.css';

const GetStatusTag = (props) => {
    let status = props.statusTag;
    return <div className={status + " p-1 font-bold rounded-lg tracking-widest w-3 inline text-xs"}>{status.toUpperCase()}</div>
}

export default GetStatusTag;
