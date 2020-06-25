import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const AuthorInfo = ({ className, img, iconClass, name, department, redirectUrl }) => {

    const authorInfo =
      <div className={"flex items-center " + className}>
          <Avatar imagePath={img
              ? img
              : "../../../assets/icons/image 1.png"}
          className={iconClass}/>
          <div className="pl-3">
              <p className="text-sm font-medium">{name}</p>
              {department &&
              <p className="leading-tight text-xs text-nebula-grey-600">{department}</p>
              }
          </div>
      </div>;

    if (redirectUrl) {
        return (
            <div className="hover:text-nebula-blue w-64">
                <Link to={"/profile/" + redirectUrl}>
                {authorInfo}
                </Link>
            </div>
        );
    } else {
        return (authorInfo);
    }
};

export default AuthorInfo;
