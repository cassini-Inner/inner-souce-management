import React from "react";

const SplitContainerWithImage = (props) => {
    return (
        <div className="flex flex-row w-screen h-screen bg-nebula-blue-light">
            <div className="w-full bg-white flex flex-col justify-center items-end px-4 lg:px-16 md:w-2/3 lg:w-1/2">
                <div className="w-full md:max-w-screen-sm">
                    {props.body}
                </div>
            </div>
            {/*<div className="w-1/2 bg-nebula-blue-light flex flex-col items-start justify-center bg-no-repeat bg-left" style={{backgroundImage: "url(\"../../../assets/images/login_bg.svg\")"}}/>*/}
            <div className=" flex flex-row hidden md:block md:1/3 lg:w-1/2">
                <img src="../../../../assets/images/login_bg.svg" className="h-screen w-full object-cover"/>
            </div>
        </div>
    );
};

export default SplitContainerWithImage;
