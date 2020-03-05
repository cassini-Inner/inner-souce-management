import React from "react";

const ModalContainer = (props) => {
    if(props.state.display) {
        disableScroll();
        return (
                <div>
                    <div className="fixed flex flex-wrap bg-black opacity-50 w-full h-full z-30" />
                        <div id="modal" className={ "flex-col bg-white fixed z-40 p-6 ml-16 mt-16 " +props.state.class }>
                        <div id="header" className="text-lg mb-2">{props.state.header}</div>
                        <hr />
                        <div id="content" className="mt-4 mb-4 bg-white w-auto">{props.state.content}</div>
                        <hr />
                        <div id="footer" className="mt-2 flex">
                            <div id="information" className="flex-1 p-2">
                                {props.state.information}
                            </div>
                            <div id="buttons" className="p-2">
                                {props.state.buttons}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
    else {
        enableScroll();
        return("");
    }
}

const disableScroll = () => {
    let name = "overflow-y-hidden";
    let arr = document.body.className.split(" ");
    if (arr.indexOf(name) == -1) {
        document.body.className += " " + name;
    }
}

const enableScroll = () => {
    let name = "overflow-y-hidden";
    let arr = document.body.className.split(" ");
    arr[arr.indexOf(name)] = "overflow-y-scroll";
    document.body.className = arr.join('');
}



// const setInformation
export default ModalContainer;

