import React, { Fragment, useState } from 'react';
import Routes from "./Routes";
import Modal from "./Modal";

const App  = () => {
    const [ modalState, setModalState] = useState({
        modal: {
            display: false,
            type: "",
        }
    });

    return (
        <Fragment>
            <Modal state = { modalState } />
            <Routes setModalState = { setModalState } />
        </Fragment>
    );
};
export default App;
