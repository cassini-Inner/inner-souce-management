import React, { useState } from 'react';
import { withRouter } from 'react-router';
const Tabs = (props) => {

    const [ state, setState ] = useState({
        currentTab: Object.keys(props.tabList)[0]
    })

    const notSelectedClasses = " hover:text-nebula-blue";
    const selectedClasses = " border-nebula-blue text-nebula-blue";  

    const selectTabHandler = (event) => {
        let currentTab = event.currentTarget.id;
        setState({
            currentTab: currentTab
        })
        props.history.push(props.match.url + "/" + currentTab)
    }

    const content = Object.entries(props.tabList).map(([tab , number]) => {
        return(
                <div key = { tab }
                    id = { tab }
                    onClick={ selectTabHandler } 
                    className = { "flex border-b-2 border-transparent py-2 px-8 text-lg font-semibold" + (state.currentTab == tab ? selectedClasses : notSelectedClasses) }
                >
                    { tab }
                    <div className="text-nebula-grey-500 pl-3">
                        { number }
                    </div>
                </div>
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