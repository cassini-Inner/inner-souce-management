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
                className="bg-white flex-col flex lg:sticky fixed lg:h-screen lg:top-0 lg:overflow-y-auto lg:w-1/2 lg:w-1/2 ">
                <div className="px-5 py-5 lg:px-10 lg:pb-4 lg:pt-8">
                    <div className="cursor-pointer select-none hover:text-nebula-blue" onClick={goBack}>
                        <div className="flex items-center">
                            <Icons.ArrowLeft className="w-4 h-4"/>
                            <p className="text-sm pl-2 leading-snug">Back</p>
                        </div>
                    </div>
                </div>
                <div className="px-2 pb-24 lg:px-10">
                    {props.leftView}
                </div>
                <div className="sticky bottom-0 bg-white px-6 pb-2 pt-4 justify-end">
                    <hr/>
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
                                        <div className={" ml-1 mr-1 my-1 w-full"}>
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
                className="w-full px-4  lg:overflow-y-auto bg-white lg:w-2/3 lg:px-10 py-16  lg:h-screen">
                {props.rightView}
            </div>
        </div>
    );
};

export default withRouter(SplitContainer);
