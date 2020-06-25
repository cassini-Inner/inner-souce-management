import React from "react";
import LoginImage from "../../assets/images/login_bg.svg";
const SplitContainerWithImage = (props) => {
    return (
        <div className="flex flex-row bg-nebula-blue-light overflow-hidden h-screen w-full">
            <div className="bg-white w-full flex h-full md:w-2/3 lg:w-1/2">
                <div className="ml-auto overflow-y-auto h-full">
                    {props.body}
                </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img src={LoginImage} className="w-full h-full object-cover" />
            </div>
        </div>
    );
};
export default SplitContainerWithImage;