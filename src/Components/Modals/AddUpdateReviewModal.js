import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
    CREATE_REVIEW_MUTATION,
    GET_MILESTONES,
    UPDATE_REVIEW_MUTATION,
} from "../../queries";
import ModalViewWithScrim from "./ModalViewWithScrim";
import TextAreaInput from "../Common/InputFields/TextAreaInput";
import Button from "../Common/Button/Button";
import { RatingDisplay } from "../Ratings/RatingDisplay";

export const AddUpdateReviewModal = ({ forwardedRef, close, milestone, initialReviewData, jobId, milestoneNumber }) => {
    const [rating, setRating] = useState(
        initialReviewData ? initialReviewData.rating : 0);
    const [review, setReview] = useState(
        initialReviewData ? initialReviewData.remark : "");
    console.log("jobId", jobId);
    const [createReview, { loading: createReviewLoading }] = useMutation(
        CREATE_REVIEW_MUTATION, {
            variables: {
                review: {
                    rating: rating,
                    remark: review,
                },
                milestoneId: milestone.id,
            },
            refetchQueries: [
                {
                    query: GET_MILESTONES,
                    variables: {
                        jobId: jobId,
                    },
                },
            ],
        });

    const [updateReview, { loading: updateReviewLoading }] = useMutation(
        UPDATE_REVIEW_MUTATION,
        {
            variables: {
                review: {
                    rating: rating,
                    remark: review,
                },
                id: initialReviewData ? initialReviewData.id : null,
            },
            refetchQueries: [
                {
                    query: GET_MILESTONES,
                    variables: {
                        jobId: jobId,
                    },
                },
            ],
        },
    );

    const handleUpdateReview = (element) => {
        element.stopPropagation();
        updateReview().then((data) => close()).catch((err) => console.log(err));
    };

    const handleCreateReview = (element) => {
        element.stopPropagation();
        createReview().catch((e) => {
            console.log(e);
            close();
        }).then((data) => {
            console.log(data);
        });
    };

    return (
        <ModalViewWithScrim>
            <div ref={forwardedRef} onClick={(e) => {e.stopPropagation();}}
                className="bg-white  border border-nebula-grey-400 rounded-lg shadow-2xl flex flex-col space-y-4 px-6 py-6">
                <h2 className="text-xl text-black">Add Review</h2>
                <span
                    className="text-sm text-nebula-grey-600">Add a review for <strong
                        className="text-grey-900">{milestone.assignedTo.name}</strong> on their work for <strong
                        className="text-grey-900">Milestone #{milestoneNumber +
              1}</strong>.
                    This will be reflected on Tushar’s profile and will help other Innersource members judge them in a better way.</span>
                <p className="text-sm text-nebula-grey-600 pt-6">Overall
                  Rating</p>
                <RatingDisplay
                    expanded={true}
                    rating={rating}
                    setRating={setRating}
                    editable={true}
                />
                <p className="text-sm text-nebula-grey-600 pt-6">
                  Additional Comments
                </p>
                <TextAreaInput
                    placeholder="Type your review"
                    onChange={(e) => {
                        setReview(e.currentTarget.value);
                    }}
                    value={review}
                    rows="5"
                />
                <div className="flex bg-white justify-end items-center space-x-4">
                    <Button
                        label="Cancel"
                        type="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            close();
                        }}
                    />
                    <Button
                        label={initialReviewData ? "Update" : "Review"}
                        onClick={initialReviewData
                            ? handleUpdateReview
                            : handleCreateReview}
                    />
                </div>
            </div>
        </ModalViewWithScrim>
    );
};
