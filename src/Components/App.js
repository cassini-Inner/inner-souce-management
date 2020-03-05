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

    const changeModalState = (newState) => {
        setModalState({
                display: false,
                header: null,
                content: null,
                information: null,
                buttons: null,
                ...newState
            }
        );
    }

    return (
        <Fragment>
            <Modal state = { modalState } />
            <Routes setModalState = { changeModalState } />
        </Fragment>
    );
};
export default App;
