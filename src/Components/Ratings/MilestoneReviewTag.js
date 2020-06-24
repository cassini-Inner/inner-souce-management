import React, { useContext } from "react";
import { AuthenticationContext } from "../../hooks/useAuthentication/provider";
import { useClickOutside } from "../../hooks/useClickOutside/hook";
import { RatingDisplay } from "./RatingDisplay";
import Portal from "../Containers/Portal";
import { ViewFeedbackModal } from "../Modals/ViewFeedbackModal";
import { AddUpdateReviewModal } from "../Modals/AddUpdateReviewModal";

export const MilestoneReviewTag = ({
    isAuthor,
    jobAuthorName,
    className,
    milestone,
    milestoneNumber,
    jobId,
}) => {
    const { user } = useContext(AuthenticationContext);
    const isRatingReceiver = !isAuthor && (milestone.review && user.id === milestone.review.createdFor.id);

    const {
        ref: feedbackModalRef,
        isComponentVisible: feedbackModalVisible,
        setIsComponentVisible: setFeedbackModalVisible,
    } = useClickOutside(false);

    const {
        ref: updateModalRef,
        isComponentVisible: updateModalVisible,
        setIsComponentVisible: setUpdateModalVisible,
    } = useClickOutside(false);

    if (milestone.assignedTo == null) {
        return "";
    }

    if (milestone.review ==null && isAuthor) {
        return <button
            aria-label="edit feedback"
            className="text-xs  text-nebula-blue px-2"
            onClick={event => {
                event.stopPropagation();
            }}
        >
            Add a review for {milestone.assignedTo.name}
        </button>;
    }

    return (
        <div className={"flex flex-row space-x-2 items-center " + className}>
            <p className="text-xs font-nebula-grey-600 ">
                {isAuthor && `You rated ${milestone.review.createdFor.name}`}
                {isRatingReceiver && `${jobAuthorName.split(" ")[0]} rated you`}
            </p>
            <RatingDisplay condensed={true} expanded={false} rating={milestone.review.rating}/>
            {isAuthor &&
          <button
              aria-label="edit feedback"
              className="text-xs  text-nebula-blue px-2"
              onClick={event => {
                  event.stopPropagation();
                  setUpdateModalVisible(true);
              }}
          >
              Edit
          </button>
            }
            {isRatingReceiver &&
          <button
              aria-label="edit feedback"
              className="text-xs  text-nebula-blue px-2"
              onClick={event => {
                  event.stopPropagation();
                  setFeedbackModalVisible(true);
              }}
          >
              View Feedback
          </button>
            }
            <Portal isOpen={feedbackModalVisible}>
                <ViewFeedbackModal
                    forwardedRef={feedbackModalRef}
                    review={milestone.review}
                    close={() => setFeedbackModalVisible(false)}
                />
            </Portal>
            <Portal isOpen={updateModalVisible}>
                <AddUpdateReviewModal
                    forwardedRef={updateModalRef}
                    assignedUser = {milestone.assignedTo.name}
                    close={() => setUpdateModalVisible(false)}
                    milestone={milestone}
                    milestoneNumber={milestoneNumber}
                    jobId={jobId}
                    initialReviewData={milestone.review}
                />
            </Portal>
        </div>
    );
};
