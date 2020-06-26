import React from "react";
import { Link } from "react-router-dom";
import { RatingDisplay } from "../../Ratings/RatingDisplay";
import { ArrowRight } from "react-feather";
import LoginImage from "../../../assets/images/login_bg.svg";

const UserCard = (props) => {
    const user = props.user;
    return (
        <div
            className={"bg-white rounded-lg border border-nebula-grey-400 select-text cursor-pointer transition duration-300 shadow-none hover:shadow-lg  " +
        props.className} key={user.id}>
            <div className="h-24 bg-nebula-blue-light border border-nebula-blue-light overflow-hidden rounded-tl-lg rounded-tr-lg">
                <img src={LoginImage} className="w-full object-cover" />
            </div>
            <Link to={"/profile/" + user.id}>
                <div className="-mt-12">
                    <img src={user.photoUrl}
                        className="shadow-lg flex-0 h-20 w-20 rounded-full ml-4"/>
                </div>
                <div className="flex flex-col justify-between ">
                    <div>
                        <div className="p-4">
                            <div
                                className="flex flex-col h-full  justify-between">
                                <h2 className="text-base text-nebula-grey-800 font-semibold">{user.name}</h2>
                                <h2 className="text-sm text-nebula-blue">{user.role}</h2>
                                <h2 className="text-sm text-nebula-grey-600">@{user.department}</h2>
                            </div>
                            <p className="text-sm text-nebula-grey-700 mt-5 break-all">{user.bio}</p>
                        </div>
                        <hr/>
                    </div>

                    <div className="px-4 py-3 flex">
                        <div
                            className="text-nebula-grey-700 text-sm flex-1 items-center"
                        >
                            {user.overallRating &&
                            <div className="flex items-center">
                                <p>Overall rating</p>
                                <p className="pl-2">
                                    <RatingDisplay
                                        expanded={false}
                                        condensed={true}
                                        rating={user.overallRating}
                                    />
                                </p>
                            </div>
                            }
                        </div>
                        <div
                            className="flex text-nebula-blue hover:text-blue-700 items-center">
                            <p className="text-sm font-semibold text-sm mr-2">View profile</p>
                            <p><ArrowRight className="h-4 w-4"/></p>
                        </div>
                    </div>

                </div>

            </Link>
        </div>
    );
};

export default UserCard;
