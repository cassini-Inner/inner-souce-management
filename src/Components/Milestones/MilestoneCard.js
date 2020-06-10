import React, { useContext, useState } from "react";
import * as Icons from "react-feather";
import InfoTag from "../Common/InfoTag/InfoTag";
import StatusTags from "../Common/StatusTags/StatusTags";
import { DurationParser } from "../../HelperFunctions/DurationParser";
import { TOGGLE_MILESTONE_COMPLETED } from "../../mutations";
import { useMutation } from "@apollo/client";
import {
    CREATE_REVIEW_MUTATION,
    GET_JOB_DETAILS,
    GET_MILESTONES, UPDATE_REVIEW_MUTATION,
} from "../../queries";
import LoadingIndicator from "../Common/LoadingIndicator/LoadingIndicator";
import PropTypes from "prop-types";
import { AuthenticationContext } from "../../hooks/useAuthentication/provider";
import Portal from "../Containers/Portal";
import ModalViewWithScrim from "../Modals/ModalViewWithScrim";
import { useClickOutside } from "../../hooks/useClickOutside/hook";
import Button from "../Common/Button/Button";
import TextAreaInput from "../Common/InputFields/TextAreaInput";

const MilestoneCard = ({ jobId, expanded, isEditMode, isJobAuthor, milestone, className, index, lastIndex, editMilestone, jobAuthorName }) => {

    const initialState = {
        isExpanded: expanded,
    };
    const [state, setState] = useState(initialState);


    const {
        ref: addReviewModalRef,
        isComponentVisible: addReviewModalVisible,
        setIsComponentVisible: setAddReviewModalVisible,
    } = useClickOutside(false);


    //Toggle milestone as completed
    const [toggleMilestoneMutation, { toggleMilestoneLoading, toggleMilestoneError }] = useMutation(
        TOGGLE_MILESTONE_COMPLETED,
        {
            refetchQueries: [
                {
                    query: GET_JOB_DETAILS,
                    variables: { jobId: jobId },
                },
                {
                    query: GET_MILESTONES,
                    variables: { jobId: jobId },
                },
            ],
            onCompleted: (data => {
                setAddReviewModalVisible(true);
            }),
        },
    );

    if (toggleMilestoneLoading) return <LoadingIndicator/>;
    if (toggleMilestoneError) {
        return <p>Toggle milestone mutation
            Error! {toggleMilestoneError}</p>;
    }

    const toggleExpandedState = () => {
        const currentState = state.isExpanded;
        setState({
            isExpanded: !currentState,
        });
    };

    const toggleMilestoneStatus = (event) => {
        const milestoneId = event.currentTarget.id;
        toggleMilestoneMutation({
            variables: {
                milestoneId: milestoneId,
            },
        }).catch((e) => {
            alert("Could not toggle milestones status: ", e);
        });
    };

    const isExpanded = state.isExpanded;
    const isMilestoneCompleted = milestone.status
        ? (milestone.status.toUpperCase() == "COMPLETED" ? true : false)
        : false;

    console.log(milestone.review);
    return (
        <div className={"flex " + className}>
            <div>
                <svg
                    className="w-3 relative mt-6 fill-current text-nebula-grey-400"
                    viewBox="0 0 12 12" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="6" fill=""/>
                </svg>
                <div className={(index === lastIndex - 1 ? "" : "h-full ") +
              " w-px mx-auto bg-nebula-grey-400"}/>
            </div>
            <div className="mx-4 flex-1 ">
                <div className="flex items-center flex-wrap">
                    <div className="flex flex-1 flex-col">
                        <div className="h-4"/>
                        <div className="flex-1">
                            <p
                                className="font-semibold text-nebula-grey-600">Milestone
                              #{index + 1}</p>
                        </div>
                        <div className="h-4"/>
                    </div>
                    {isEditMode &&
                  <div
                      className="flex text-nebula-grey-500 hover:text-nebula-blue"
                      id={"#" + index}
                      onClick={editMilestone}
                  >
                      <Icons.Edit className=" mx-4"/>
                      {/* <Icons.Delete className="text-nebula-red mx-4" /> */}
                  </div>
                    }
                    {
                        isJobAuthor
                            ?
                            isMilestoneCompleted
                                ?<div id={milestone.id}
                                    className="flex items-center text-nebula-blue mx-4"
                                >
                                    <div className="px-2">Completed</div>
                                    <Icons.CheckCircle className="h-4 w-4"/>
                                </div>
                                : <div
                                    id={milestone.id}
                                    onClick={toggleMilestoneStatus}
                                    className="flex items-center text-nebula-grey-600 hover:text-nebula-blue mx-4 cursor-pointer"
                                >
                                    <div className="px-2">Mark as completed</div>
                                    <Icons.CheckCircle className="h-4 w-4"/>
                                </div>
                            :
                            ""
                    }
                </div>
                <div
                    className="bg-white rounded-md shadow-none border-nebula-grey-400 border px-6 py-6 cursor-pointer transition duration-100 hover:shadow-md"
                    onClick={toggleExpandedState}>
                    <div className="flex flex-row justify-start items-start">
                        <p
                            className="text-base leading-tight flex-1 font-semibold mb-2 pr-4 ">{milestone.title}</p>

                        <button
                            className={" transition duration-150 ease-in-out transform " +
                        (isExpanded ? "rotate-0" : "rotate-180")}>
                            <Icons.ChevronUp/>
                        </button>
                    </div>
                    {
                        milestone.status ?
                            <StatusTags
                                statusTag={[milestone.status.toLowerCase()]}/>
                            : ""
                    }
                    {milestone.review &&
                    <MilestoneReviewTag
                        isAuthor={isJobAuthor}
                        className="mt-4"
                        milestone = {milestone}
                        jobAuthorName={jobAuthorName}
                        jobId={jobId}
                        milestoneNumber={index}
                    />
                    }
                    {milestone.review == null && isJobAuthor && milestone.assignedTo &&
                        <AddReviewButton milestone={milestone} jobId={jobId}/>
                    }

                    {isExpanded &&
                  <div>
                      <p
                          className="pt-4 text-sm text-nebula-grey-700 leading-relaxed">{milestone.description ||
                      milestone.desc}</p>
                      <div className="flex flex-row flex-wrap">
                          <InfoTag className="mr-6 mt-4" title="DURATION"
                              data={DurationParser(milestone.duration)}/>
                          <InfoTag className="mr-6 mt-4"
                              title="RESOLUTION METHODS"
                              data={milestone.resolution}/>
                          {
                              milestone.skills ?
                                  <InfoTag
                                      className="mr-6 mt-4"
                                      title="SKILLS NEEDED"
                                      // To convert the incoming type of (if object type) skills to array
                                      data={milestone.skills.map(
                                          (skill, key) => typeof skill === "object"
                                              ? skill.value
                                              : skill)}
                                  />
                                  : []
                          }
                      </div>
                  </div>
                    }

                </div>
            </div>
            <Portal isOpen={addReviewModalVisible}>
                <AddUpdateReviewModal
                    milestoneNumber={index}
                    forwardedRef={addReviewModalRef}
                    close={() => setAddReviewModalVisible(false)}
                    milestone={milestone}
                    jobId={jobId}
                />
            </Portal>
        </div>
    );
};

const AddReviewButton = ({milestone, jobId, milestoneNumber})=> {

    const {
        ref: addReviewModalRef,
        isComponentVisible: addReviewModalVisible,
        setIsComponentVisible: setAddReviewModalVisible,
    } = useClickOutside(false);

    return (
        <div className="mt-4">
            <button
                aria-label="edit feedback"
                className="text-xs  text-nebula-blue"
                onClick={event => {
                    event.stopPropagation();
                    setAddReviewModalVisible(true);
                }}
            >
              Add a review for {milestone.assignedTo.name}
            </button>
            <Portal isOpen={addReviewModalVisible}>
                <AddUpdateReviewModal
                    forwardedRef={addReviewModalRef}
                    assignedUser = {milestone.assignedTo.name}
                    close={() => setAddReviewModalVisible(false)}
                    milestone={milestone}
                    jobId={jobId}
                    milestoneNumber={milestoneNumber}
                />
            </Portal>
        </div>
    );
};

const MilestoneReviewTag = ({
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
                console.log(milestone.id);
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
            <RatingDisplayWidget expanded={false} rating={milestone.review.rating}/>
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

        </div>);
};

const ViewFeedbackModal = ({ review, forwardedRef, close }) => {
    return (
        <ModalViewWithScrim>
            <div ref={forwardedRef} onClick={(e) => {e.stopPropagation();}}
                className="bg-white border border-nebula-grey-400 rounded-lg shadow-2xl flex flex-col space-y-4 px-6 py-6">
                <h2 className="text-xl text-black">Feedback</h2>
                <p className="text-sm text-nebula-grey-600">Overall Rating</p>
                <RatingDisplayWidget expanded={true} rating={review.rating}/>
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

const AddUpdateReviewModal = ({ forwardedRef, close, milestone, initialReviewData, jobId, milestoneNumber }) => {
    const [rating, setRating] = useState(initialReviewData ? initialReviewData.rating : 0);
    const [review, setReview] = useState(initialReviewData ? initialReviewData.remark: "");
    console.log("jobId", jobId);
    const [createReview, {loading: createReviewLoading}] = useMutation(CREATE_REVIEW_MUTATION, {
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
                }
            }
        ]
    });

    const [updateReview, {loading: updateReviewLoading}] = useMutation(UPDATE_REVIEW_MUTATION,
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
                    }
                }
            ]
        }
    );

    const handleUpdateReview = (element) => {
        element.stopPropagation();
        updateReview().then((data) => close()).catch((err)=> console.log(err));
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
                <h2 className="text-xl text-black" >Add Review</h2>
                <span className="text-sm text-nebula-grey-600">Add a review for <strong className="text-grey-900">{milestone.assignedTo.name}</strong> on their work for <strong className="text-grey-900">Milestone #{milestoneNumber + 1}</strong>.
                    This will be reflected on Tushar’s profile and will help other Innersource members judge them in a better way.</span>
                <p className="text-sm text-nebula-grey-600 pt-6">Overall Rating</p>
                <RatingDisplayWidget
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
                        label={initialReviewData ? "Update": "Review"}
                        onClick={initialReviewData ? handleUpdateReview : handleCreateReview}
                    />
                </div>
            </div>
        </ModalViewWithScrim>
    );
};

const RatingDisplayWidget = ({ expanded, rating, setRating, editable }) => {
    let color = "";
    if (rating >= 1 && rating < 2) {
        color = "nebula-red";
    } else if (rating >= 2 && rating <= 3) {
        color = "nebula-yellow";
    } else if (rating > 3) {
        color = "nebula-green";
    }


    return (
        <div className="flex flex-row cursor-pointer" >
            {expanded &&
          [1, 2, 3, 4, 5].map(value => {
              if (value <= rating) {
                  return(
                      <Icons.Star
                          onClick = {editable ? () => setRating(value) : null}
                          className={"fill-current h-5 w-5 mr-1 text-" + color}
                          key = {value}
                      />
                  );
              }
              return <Icons.Star
                  onClick={editable ? () => setRating(value) : null}
                  key={value}
                  className={"stroke-current h-5 w-5 mr-1 text-nebula-grey-500"}
              />;
          })
            }
            {!expanded &&
          <div className="flex flex-row space-x-1 items-center">
              <Icons.Star className={"fill-current h-4 w-4 text-" + color}/>
              <p className={`text-sm text-${color}`}>{rating}</p>
          </div>
            }
        </div>
    );
};

RatingDisplayWidget.propTypes = {
    expanded: PropTypes.bool,
    rating: PropTypes.number,
};

export default MilestoneCard;
