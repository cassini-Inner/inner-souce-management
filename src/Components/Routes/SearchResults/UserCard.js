import React from "react";
import { Link } from "react-router-dom";
import { RatingDisplay } from "../../Ratings/RatingDisplay";
import { AlignRight, ArrowRight } from "react-feather";
const UserCard = (props) => {
    const user = props.user;
    return (
        <div className={"bg-white rounded-lg border border-nebula-grey-400 select-text cursor-pointer transition duration-300 shadow-none hover:shadow-lg  " + props.className} key={user.id}>
            <div className="absolute mt-2">
                <img src={user.photoUrl} className="flex-0 h-20 w-20 rounded-full mt-12 ml-4"/>
            </div>
            <div className="h-24 bg-nebula-blue-light" />
            <Link to={"/profile/" + user.id} >
                <div className="p-6">
                    <div className="flex flex-col h-full mt-6 flex-1 justify-between">
                            <h2 className="text-lg font-semibold">{user.name}</h2>
                            <h2 className="text-nebula-blue">{user.role}</h2>
                            <h2 className="text-base text-nebula-grey-600">@{user.department}</h2>
                    </div>
                    <p className="text-nebula-grey-600 mt-3">{user.bio}</p>
                </div>
                <hr />
                <div className="px-6 py-4 flex">
                    <div className="text-nebula-grey-700 text-sm flex-1 items-center">
                        <div className="flex items-center">
                            <p>Overall rating</p>
                            <p className="pl-2">
                                <RatingDisplay expanded={false} condensed={false} rating={user.overallRating} />
                            </p>
                        </div>
                    </div>
                    <div className="flex text-nebula-blue hover:text-blue-700 items-center">
                        <p className="font-semibold text-sm mr-2">View profile</p>
                        <p><ArrowRight /></p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default UserCard;
