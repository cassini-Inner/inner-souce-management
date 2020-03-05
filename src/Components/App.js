import React, { Fragment, useState } from 'react';
import Routes from "./Routes";
import Modal from "./Modal";

const App  = () => {

    const [ modalState, setModalState] = useState({
        display: false,
        header: null,
        content: null,
        information: null,
        buttons: null,
    });

    return (
        <Fragment>
            <Modal state = { modalState } />
            <Routes setModalState = { setModalState } />
        </Fragment>
    );
};
export default App;
