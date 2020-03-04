import React from "react";

const ModalContainer = (props) => {
    if(props.state.display) {
        return (
                <div>
                    <div className="fixed bg-black opacity-50 w-screen h-screen z-30" />
                        <div id="modal" className="bg-nebula-grey-200 fixed z-40">
                        <div id="header" className="flex my-4 pl-2">Hiii</div>
                        <div id="content" className="mb-4 p-2 bg-white">Helloo</div>
                    </div>
                </div>
        );
    }
    else
        return("");
}

export default ModalContainer;


// const FilterModal = () => {

// }
