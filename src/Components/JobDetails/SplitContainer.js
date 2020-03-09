import React, { Fragment } from "react";
import { BackIcon } from "../Icons";

const SplitContainer = (props) => {
    const goBack = props => {
        //go to previous page
    }
    return (
        <div className="bg-white lg:flex-row lg:max-w-screen-xl mx-auto ">
            <div className="md:flex">
                <div
                    className="bg-white flex-col flex md:sticky md:top-0 md:overflow-y-auto  md:w-1/2 md:h-screen lg:h-screen lg:w-1/2 ">
                    <div className="px-5 py-5 flex-1 lg:px-10 lg:py-12">
                        <div className="cursor-default hover:text-nebula-blue" onClick={goBack}>
                            <div className="flex">
                                <BackIcon />
                                <p className="text-base pl-2 leading-snug">Back</p>
                            </div>
                        </div>
                        {props.leftView}
                    </div>

                    <div className="sticky bottom-0 bg-nebula-grey-100 px-6 py-6 justify-end">
                        <hr></hr>
                        <div className="mt-5">
                            <div className="text-nebula-blue text-base font-semibold leading-tight">{props.statusTitle}</div>
                            <div className="text-nebula-grey-800 text-sm leading-tight">{props.statusSubtitle}</div>
                        </div>
                        <div className="flex w-full justify-end">

                            {
                                props.actions.map((button) => {
                                    return (
                                        <div className="ml-2">
                                            {button}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full px-4 lg:h-screen md:w-1/2 md:overflow-y-auto bg-white lg:w-2/3 lg:px-10 py-12">
                    {props.rightView}
                </div>
            </div >
        </div >
    );
}
export default SplitContainer;
