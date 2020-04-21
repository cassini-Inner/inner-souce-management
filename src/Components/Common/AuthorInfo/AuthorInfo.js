import React from "react";

const AuthorInfo = (props) => {
    return (
        <div className="flex">
            <img src={ props.img?props.img : "../assets/icons/image 1.png" } className="mt-1 w-8 h-8 "/>
            <div className="pl-3">
                <p className="text-sm font-semibold">{props.name}</p>
                <p className="leading-tight text-xs text-nebula-grey-600">{props.department}</p>
                { props.date ? <p className="leading-tight text-xs text-nebula-grey-600">{props.date}</p> : "" }
            </div>
        </div>
    );
};

export default AuthorInfo;
