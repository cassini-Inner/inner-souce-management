import React from "react";

const AuthorInfo = (props) => {
    return (
        <div className="flex">
            <img src="../assets/icons/image 1.png" className="mt-1 w-8 h-8 "/>
            <div className="pl-3">
                {/*TODO: Make get details from props*/}
                <p className="text-sm font-semibold">{props.name?props.name:"Carl Johnson"}</p>
                <p className="leading-tight text-xs text-nebula-grey-600">{props.department?props.department:"Risk Analysis"}</p>
            </div>
        </div>
    );
};

export default AuthorInfo;
