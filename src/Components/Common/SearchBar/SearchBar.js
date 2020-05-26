import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_JOBS_USERS_LIMIT } from "../../../queries";
import Avatar from "../Avatar/Avatar";
import {Briefcase} from "react-feather";
import StatusTags from "../StatusTags/StatusTags";
import { Link } from "react-router-dom";
const SearchBar = ({searchOpen,setSearchOpen}) => {
    const searchInputRef = useRef();
    const [jobs, setJobs] = useState([]);
    const [users, setUsers] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState();
    const [getSearchResults] = useLazyQuery(SEARCH_JOBS_USERS_LIMIT, {
        onCompleted: (data) => {
            setJobs(data.Search.jobs ? data.Search.jobs : []);
            setUsers(data.Search.users ? data.Search.users : []);
        },
        onError: (error => {console.log(error);}),
    });

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);
    const handleChange = (e) => {
        const value = e.target.value;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        if (value === "") {
            setJobs([]);
            setUsers([]);
            return;
        }

        const timeout = setTimeout(() => {
            console.log("timed out");
            getSearchResults({
                variables: {
                    query: value,
                    limit: 3,
                },
            });
        }, 500);
        setTypingTimeout(timeout);
    };
    return (
        <div className="flex-1">
            <div className="mx-auto pt-8 w-full max-w-screen-md">
                <input
                    ref={searchInputRef}
                    onFocus={(event) => {
                        setSearchOpen(true);
                        console.log(event.currentTarget);
                    }}
                    onChange={(e) => {handleChange(e);}}
                    onClick={(e)=> {e.stopPropagation();}}
                    placeholder="Search for jobs and users by name"
                    className={
                        " appearance-none bg-white transition duration-300 outline-none bg-transparent w-full py-4 px-4 flex-1 mx-auto "
                          + " focus:shadow-lg focus:border focus:border-nebula-grey-200 "
                          + ( (jobs.length || users.length) ? " border rounded-tr-lg rounded-tl-lg border-nebula-grey-200" : " rounded-lg " )
                    }
                />
                <SearchResults users={users} jobs={jobs}/>
            </div>
        </div>
    );
};

const SearchResults = ({jobs, users}) => {
    if (!jobs.length && !users.length) {
        return (<div/>);
    }
    return (
        <div
            className="px-4 py-4 shadow-lg border border-nebula-grey-300 rounded-bl-lg rounded-br-lg bg-white w-full max-w-screen-md">
            {jobs && jobs.length > 0 &&
          <>
              <p className="text-xs font-semibold text-nebula-grey-600">Jobs</p>
              <div>
                  {jobs.map((job) => {
                      return <JobSearchListing
                          key={job.id}
                          title={job.title}
                          status={job.status}
                          id = {job.id}
                          viewerHasApplied={job.viewerHasApplied}
                          description = {job.description}
                      />;
                  })}
              </div>
          </>
            }
            {users && users.length > 0 &&
          <>
              <p className="text-xs mt-4 font-semibold text-nebula-grey-600">Users</p>
              {users.map((user) => {
                  return <UserSearchListing
                      id={user.id}
                      key={user.id}
                      name={user.name}
                      photoUrl={user.photoUrl}
                      department={user.department}
                      role={user.role}
                  />;
              })}
          </>
            }
        </div>
    );
};

const UserSearchListing = ({name, role, department, photoUrl,id}) => {
    return (
        <Link to={`/profile/${id}`}>
            <div className="flex flex-row items-start leading-tight ">
                <Avatar imagePath={photoUrl} className="w-10 h-10 mr-4 mt-4"/>
                <div className="flex-1 pt-4 pb-4 border-b border-nebula-grey-300">
                    <div className="text-sm font-semibold text-nebula-grey-800">{name}</div>
                    <div className="text-sm text-nebula-grey-600">{role} @ {department} </div>
                </div>
            </div>
        </Link>
    );
};


const JobSearchListing = ({title, status,viewerHasApplied, description, id}) => {
    const tags = [];
    if (status) {
        tags.push(status.toLowerCase());
    }
    if (viewerHasApplied) {
        tags.push(viewerHasApplied ? "applied" : "" );
    }

    return (
        <Link to={`/jobDetails/${id}`}>
            <div className="flex flex-row items-start leading-tight ">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-nebula-blue bg-nebula-blue-light mr-4 mt-4">
                    <Briefcase className="w-5 h-5"/>
                </div>
                <div className="flex-1 pt-4 pb-4 border-b border-nebula-grey-300">
                    <div className=" text-sm font-semibold text-nebula-grey-800 mb-2">{title}</div>
                    <div className="text-sm text-nebula-grey-700 mb-3">{description.slice(0,200)}</div>
                    <StatusTags statusTag={tags} />
                </div>
            </div>
        </Link>
    );
};

export default SearchBar;
