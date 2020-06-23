import React from "react";
import { BeatLoader, MoonLoader } from "react-spinners";
import TailwindConfig from "../../../../tailwind.config";
const LoadingIndicator = (props) => {
    return (
        <div className="flex flex-col items-center justify-center py-4 px-4 w-full h-full flex-1 ">
            <BeatLoader size={8} margin={4} color={TailwindConfig.theme.extend.colors["nebula-blue"]}/>
        </div>
    );
};

export default LoadingIndicator;
