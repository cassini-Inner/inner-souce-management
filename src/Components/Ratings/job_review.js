import { Link } from "react-router-dom";
import Card from "../Common/Card/Card";
import React from "react";
import { MilestoneReview } from "./milestone_review";
import Avatar from "../Common/Avatar/Avatar";
import AuthorInfo from "../Common/AuthorInfo/AuthorInfo";

export const JobReview = ({ review }) => {

    return (
        <div className="pb-2 pt-2">
            <Link to={`/jobDetails/${review.job.id}`}>
                <Card isInteractive={true}>
                    <div className="px-2">
                        <p
                            className="font-semibold text-nebula-grey-900 pb-2 pt-2">{review.job.title}</p>
                        {
                            review.milestoneReview.map(
                                ({ review, milestone },key) => {
                                    if (review == null) return "";
                                    const { id, rating, remark, timeCreated } = review;
                                    return <MilestoneReview
                                        key={id}
                                        milestoneNumber={key + 1}
                                        rating={rating}
                                        remark={remark}
                                        date={new Date(timeCreated).toISOString().split("T")[0]}
                                    />;
                                })
                        }
                        <hr className="my-4"/>
                        <AuthorInfo
                            img={review.job.createdBy.photoUrl}
                            name={review.job.createdBy.name}
                            iconClass="w-8 h-8"
                            department={review.job.createdBy.department}
                        />
                    </div>
                </Card>
            </Link>
        </div>
    );
};
