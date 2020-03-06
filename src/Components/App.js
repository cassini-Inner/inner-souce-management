import React, { useState, Fragment } from 'react';
import Routes from "./Routes";
import Sidebar from './Sidebar';
import Modal from "./Modal";


const App = () => {

    const [modalState, setModalState] = useState({
        display: false,
        class: null,
        header: null,
        content: null,
        information: null,
        buttons: null,
    });

    const changeModalState = (newState) => {
        setModalState({
            display: false,
            class: null,
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
            <Modal state={modalState} />
            <div className=" bg-nebula-grey-200 w-full h-full subpixel-antialiased">
                <div className="flex flex-col lg:flex-row justify-center">
                    <Sidebar />
                    <div className="w-full lg:flex-row lg:max-w-screen-xl">
                        <Routes setModalState={changeModalState} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default App;
