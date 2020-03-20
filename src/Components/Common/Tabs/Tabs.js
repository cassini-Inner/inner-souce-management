import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

const Tabs = (props) => {
    const [ currentTab, setState ] = useState("");

    const notSelectedClasses = " hover:text-nebula-blue";
    const selectedClasses = " border-nebula-blue text-nebula-blue";  

    const selectTabHandler = (event) => {
        let tab = event.currentTarget.id;
        setState(tab);
    }

    //To set the initial selected tab
    if(currentTab === "") {
        let sublink = props.currentLink ? props.currentLink : Object.keys(props.tabList)[0];
        setState(sublink)
    }

    //If the initial selected tab and route not in sync
    if((props.location.pathname).indexOf(currentTab) === -1) {
        // console.log("hii ",props.location.pathname, state.currentTab)
    }

    const content = Object.entries(props.tabList).map(([tab , number]) => {
        return(
                <NavLink to = {props.match.url + "/" + tab}>
                <div key = { tab }
                    id = { tab }
                    onClick={ selectTabHandler } 
                    className = { "flex border-b-2 border-transparent py-2 px-8 text-lg font-semibold" + (currentTab == tab ? selectedClasses : notSelectedClasses) }
                >
                    { tab }
                    <div className="text-nebula-grey-500 pl-3">
                        { number }
                    </div>
                </div>
                </NavLink>
            )
        }
    );

    return(
        <div className = "flex border-b border-nebula-grey-400 w-full cursor-default">
            { content }
        </div>
    );
}

export default withRouter(Tabs);