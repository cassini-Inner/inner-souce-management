import React, {  useState } from 'react';
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
        <div className=" bg-nebula-grey-200 w-full h-full">
            <div className="flex flex-col lg:flex-row container mx-auto">
                <Modal state = { modalState } />
                <Routes setModalState = { changeModalState } />
            </div>
        </div>
    );
};
export default App;
