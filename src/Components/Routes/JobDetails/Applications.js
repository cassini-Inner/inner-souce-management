import React, { Fragment } from "react";
import UserList from "./UserList";
import Dropdown from "../../Common/Dropdown/Dropdown";

const Applications = () => {

    return (
        <Fragment>
            <div className="mt-6 mb-8 flex-col px-2">
                <div className="flex mb-2">
                    <div className="self-center flex-1 ">
                        <p className="text-base font-semibold">Filter applications by type</p>
                        <p className="text-sm text-gray-700">
                            Since applicants can apply to specific milestones or complete job, you can filter applicants by application type.
                        </p>
                    </div>
                    <div className="flex">
                        <Dropdown list={["Job & Milestones", "Job", "Milestones"]} />
                    </div>
                </div>

            </div>
            <div className="flex-col my-6 px-2">
                <div className="flex text-sm ">
                    <div className="flex-1 font-semibold text-nebula-gray-600">
                        Applicant
                    </div>
                    <div className="flex font-semibold mr-40 text-nebula-gray-600">
                        Application Type
                    </div>
                </div>
                <UserList />
            </div>
        </Fragment>

    );
};

export default Applications;