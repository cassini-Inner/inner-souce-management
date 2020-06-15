import { RatingDisplay } from "./RatingDisplay";
import React from "react";

export const MilestoneReview = ({ milestoneNumber, rating, date, remark }) => {
    return (
        <div className="flex flex-col py-2">
            <div className="flex items-center">
                <p className="text-xs w-32 font-semibold text-nebula-grey-700 pb-2">
                  Milestone #{milestoneNumber}
                </p>
                <p className="text-xs text-nebula-grey-600">
                  Reviewed on {date}
                </p>
            </div>
            <div className="flex item-center">
                <div className="w-32">
                    <RatingDisplay
                        rating={rating}
                        editable={false}
                        expanded={true}
                        condensed={true}
                    />
                </div>
                {remark
                    ? <p className="text-sm font-medium text-nebula-grey-800">{remark}</p>
                    : <p className="text-sm text-nebula-grey-600">No remark added</p>
                }
            </div>
        </div>
    );
};
