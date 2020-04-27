import React from "react";
import { Link } from "react-router-dom";

const AuthorInfo = (props) => {

    const authorInfo = 
        <div className="flex items-center">
            <img src={ props.img?props.img : "../assets/icons/image 1.png" } className="mt-1 w-10 h-10 rounded-full "/>
            <div className="pl-3">
                <p className="text-sm font-semibold">{props.name}</p>
                <p className="leading-tight text-xs text-nebula-grey-600">{props.department}</p>
            </div>
        </div>

    if(props.redirectUrl) {
        return (
            <Link to={"/profile/"+props.redirectUrl}>
                <div className = "hover:text-nebula-blue">
                    {authorInfo}
                </div>
            </Link>
        );
    }
    else {
        return(authorInfo)
    }
};

export default AuthorInfo;
