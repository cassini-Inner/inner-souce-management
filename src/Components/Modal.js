import React from "react";

const ModalContainer = (props) => {
    if (props.state.display) {
        disableScroll();
        return (
            <div className="fixed pin w-screen h-screen flex justify-center items-center z-10">
                <div className="w-full h-full pin fixed bg-black opacity-25 ">

                </div>
                <div id="modal" className={"flex-col bg-white z-40 p-6 " + props.state.class}>
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
        return ("");
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