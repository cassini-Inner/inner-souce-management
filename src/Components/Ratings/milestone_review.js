import { RatingDisplay } from "./RatingDisplay";
import React from "react";

export const MilestoneReview = ({ milestoneNumber, rating, date, remark }) => {
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-12 mb-4">
            <div className="col-span-3">
                <p className="text-xs col-span-4 font-semibold text-nebula-grey-700 pb-2">
                    Milestone #{milestoneNumber}
                </p>
                <RatingDisplay
                    rating={rating}
                    editable={false}
                    expanded={true}
                    condensed={true}
                />
            </div>

            <div className="col-span-9">
                <p className="text-xs text-nebula-grey-600 pb-2">
                  Reviewed on {date}
                </p>
                {remark
                    ? <p className="text-sm font-medium text-nebula-grey-800">{remark}</p>
                    : <p className="text-sm text-nebula-grey-600">No remark added</p>
                }
            </div>
        </div>
    );
};
