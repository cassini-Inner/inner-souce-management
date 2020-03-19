import React, { useState, Fragment } from "react";
import Routes from "./Routes/Routes";
import Sidebar from "./Navigation/Sidebar";
import Modal from "./Containers/Modal";
import { BrowserRouter } from "react-router-dom";


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
    };

    return (
        <Fragment>
            <Modal state={modalState} />

            <BrowserRouter>
                <div className=" bg-nebula-grey-200 w-full h-full antialiased">
                    <div className="flex flex-col lg:flex-row justify-center">
                        <Sidebar />
                        <div className="w-full lg:flex-row lg:max-w-screen-xl">
                            <Routes setModalState={changeModalState} />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </Fragment>
    );
};
export default App;
