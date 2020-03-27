import React from "react";
import * as Icons from "react-feather";
import { withRouter } from "react-router";

const SplitContainer = (props) => {

    const goBack = () => {
        props.history.goBack();
    };

    return (
        <div className="bg-white flex flex-col lg:flex-row mx-auto xl:shadow-lg ">
            <div
                className="bg-white w-screen flex-col flex lg:sticky lg:fixed lg:h-screen lg:top-0 lg:overflow-y-auto lg:w-1/3 ">
                <div className="px-5 py-5 lg:px-10 lg:pb-4 lg:pt-8">
                    <div className="cursor-pointer select-none hover:text-nebula-blue" onClick={goBack}>
                        <div className="flex items-center">
                            <Icons.ArrowLeft className="w-4 h-4" />
                            <p className="text-sm pl-2 leading-snug">Back</p>
                        </div>
                    </div>
                </div>
                <div className="px-2 flex-1 pb-24 lg:px-10">
                    {props.leftView}
                </div>
                <div className="sticky bottom-0 bg-white px-6 pb-2 pt-4 justify-end">
                    <hr />
                    <div className="mt-2 mx-2 my-2">
                        <div
                            className="text-nebula-blue text-sm font-semibold leading-tight">{props.statusTitle}</div>
                        <div
                            className="text-nebula-grey-800 text-xs leading-tight">{props.statusSubtitle}</div>
                    </div>
                    <div className="flex w-full justify-evenly flex-col md:flex-row">
                        {
                            props.actions ?
                                props.actions.map((button, index) => {
                                    return (
                                        <div className={" ml-1 mr-1 my-1 flex-1"} key={index}>
                                            {button}
                                        </div>
                                    );
                                })
                                : ""
                        }
                    </div>
                </div>
            </div>
            <div
                className="w-screen px-4 bg-white py-16 lg:w-2/3 lg:px-10 lg:h-screen lg:overflow-y-auto">
                {props.rightView}
            </div>
        </div>
    );
};

export default withRouter(SplitContainer);
