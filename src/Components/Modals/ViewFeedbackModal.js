import ModalViewWithScrim from "./ModalViewWithScrim";
import Button from "../Common/Button/Button";
import React from "react";
import { RatingDisplay } from "../Ratings/RatingDisplay";

export const ViewFeedbackModal = ({ review, forwardedRef, close }) => {
    return (
        <ModalViewWithScrim>
            <div ref={forwardedRef} onClick={(e) => {e.stopPropagation();}}
                className="bg-white border border-nebula-grey-400 rounded-lg shadow-2xl flex flex-col space-y-4 px-6 py-6">
                <h2 className="text-xl text-black">Feedback</h2>
                <p className="text-sm text-nebula-grey-600">Overall Rating</p>
                <RatingDisplay expanded={true} rating={review.rating}/>
                <p className="text-sm text-nebula-grey-600 pt-6">Additional
                  Comments</p>
                <p className="text-sm text-nebula-grey-700">{
                    review.remark
                        ? <div>{review.remark}</div>
                        : <p> No additional comments </p>
                }</p>
                <hr/>
                <div className="flex justify-end items-center">
                    <Button
                        label="Done"
                        onClick={(e) => {
                            e.stopPropagation();
                            close();
                        }}/>
                </div>
            </div>
        </ModalViewWithScrim>
    );
};
