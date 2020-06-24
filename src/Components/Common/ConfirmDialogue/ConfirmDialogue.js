import React from "react";
import ModalViewWithScrim from "../../Modals/ModalViewWithScrim";
import ModalContainer from "../../Modals/ModalContainer";
import Portal from "../../Containers/Portal";
import Button from "../../Common/Button/Button";

const ConfirmDialogue = ({ title, msg, isOpen, onConfirm }) => {
    const confirmResponse = (e) => {
        if(e.currentTarget.id == "yes") {
            onConfirm(true);
        }
        else {
            onConfirm(false);
        }
    };
    return(
        <Portal isOpen={isOpen} >
            <ModalViewWithScrim>
                <ModalContainer>
                    <div className="text-xl mb-4 flex">
                        { title }
                    </div>
                    <div className="mt-4 mb-10 bg-white w-full h-full">
                        { msg }
                    </div>
                    <div className="py-4 sticky bottom-0 bg-white">
                        <div className="flex flex-col justify-between flex-wrap md:flex-row" >
                            <div className="flex-1" />
                            <div className="flex mt-2">
                                <Button id="no" type="secondary" label="No" className="w-full md:w-auto mx-1" onClick={confirmResponse}/>
                                <Button id="yes" type="primary" label="Yes" className="w-full md:w-auto mx-1" onClick={confirmResponse}/>
                            </div>
                        </div>
                    </div>
                </ModalContainer>
            </ModalViewWithScrim>
        </Portal>
    );
};


export default ConfirmDialogue;