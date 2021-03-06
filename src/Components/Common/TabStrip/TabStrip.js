import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const TabStrip = (props) => {
    const content = props.tabs.map(({ title, location, count, notify }, key) => {
        return (
            <NavLink to={props.match.url + "/" + location} activeClassName="border-nebula-blue text-nebula-grey-900" key={key} className={"flex border-b-2 border-transparent pb-3 pt-3 px-4 font-semibold text-nebula-grey-600 hover:bg-nebula-blue-light transition duration-300 "}>
                <div
                    key={location}
                    className="flex flex-row items-center"
                >
                    {notify &&
                        <div className="bg-nebula-blue text-sm w-2 h-2 mr-2 rounded-full" />
                    }
                    <p className="text-sm font-semibold whitespace-no-wrap">{title}</p>
                    <div className="text-nebula-grey-500 text-sm pl-2">
                        {count}
                    </div>
                </div>
            </NavLink>
        );
    }
    );
    return (
        <div className="flex border-b border-nebula-grey-400 w-full cursor-default overflow-x-auto">
            {content}
        </div>
    );
};

export default withRouter(TabStrip);
