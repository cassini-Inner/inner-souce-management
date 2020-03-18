import React from "react";

const AuthorInfo = () => {
    return (
        <div className="flex">
            <img src="../assets/icons/image 1.png" className="mt-1 w-8 h-8 "/>
            <div className="pl-3">
                <p className="text-base font-semibold">Carl Johnson</p>
                <p className="leading-tight text-sm text-nebula-grey-600">Risk
                  Analysis</p>
                {/* <p className="leading-tight text-s ">created on 17/01/2020</p> */}
            </div>
        </div>
    );
};

export default AuthorInfo;
