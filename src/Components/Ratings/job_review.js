import { Link } from "react-router-dom";
import Card from "../Common/Card/Card";
import React from "react";
import { MilestoneReview } from "./milestone_review";

export const JobReview = ({ review }) => {
    console.log(review);

    return (
        <div className="pb-2 pt-2">
            <Link to={`/jobDetails/${review.job.id}`}>

                <Card isInteractive={true}>
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
                </Card>
            </Link>
        </div>

    );
};
