import React from "react";
import LoginImage from "../../assets/images/login_bg.svg";
const SplitContainerWithImage = (props) => {
    return (
        <div className="flex flex-row bg-nebula-blue-light overflow-hidden h-screen w-full">
            <div className="bg-white w-full flex h-full lg:w-1/2">
                <div className="mr-auto ml-auto lg:ml-auto lg:mr-0 w-full max-w-screen-md overflow-y-auto h-full">
                    {props.body}
                </div>
            </div>
            <div className="hidden lg:block flex items-start md:w-1/2">
                <img src={LoginImage} className="h-full object-cover" />
            </div>
        </div>
    );
};
export default SplitContainerWithImage;
