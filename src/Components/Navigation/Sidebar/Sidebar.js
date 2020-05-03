import React, { Component } from 'react'
import '../../../assets/style/tailwind.css'
import * as Icons from 'react-feather'
import * as config from '../../../assets/placeholder'
import { appName } from '../../../assets/placeholder'
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

    state = {
        currentPage: this.props.page ? this.props.page : 'home',
        hover: false,
        mobileExpanded: false,
        desktopExpanded: true,
    }

    selectedClasses = ' text-sm text-nebula-blue bg-nebula-blue-light border-nebula-blue '
    unselectedClasses = 'flex flex-row items-center text-nebula-grey-600 text-sm h-12 my-4 font-semibold border-l-4 border-transparent '

    mobileExpandCollapseSidebar = (value) => {
        const currentState = this.state.mobileExpanded
        this.setState({
            mobileExpanded: !currentState,
        })
    }

    desktopExpandCollapseSidebar = () => {
        const currentDesktopState = this.state.desktopExpanded
        this.setState({ desktopExpanded: !currentDesktopState });
    }


    render() {
        const desktopExpanded = this.state.desktopExpanded;

        return (

            <div className={"w-auto border-l-0 z-40 sticky top-0 text-black bg-nebula-grey-100 border-nebula-grey-400 border border-r-0 px-0 lg:z-10 lg:h-screen lg:border-r-1 lg:border-b-0 lg:border-t-0 lg:border-l-0 lg:w-72 xl:w-84"}>
                <div className="w-full h-12 lg:mt-6 flex items-center ">
                    <NavLink
                      className="flex-1 text-xl pl-3 font-semibold hover:text-nebula-blue outline-none cursor-pointer"
                      to={'/'}>
                        {appName}
                    </NavLink>
                    <button className="lg:hidden focus:outline-none"
                            onClick={this.mobileExpandCollapseSidebar}>
                        {
                            this.state.mobileExpanded
                              ?
                              <Icons.X
                                className="h-5 w-5 text-nebula-blue stroke-current mr-4 "/>
                                :
                                <Icons.Menu className="h-5 w-5 text-nebula-blue stroke-current mr-4 " />
                        }
                    </button>
                </div>
                <div className={this.state.mobileExpanded ? "block " : "hidden lg:block "}>
                    <ul>
                        <li>
                            <NavLink
                                exact
                                to="/"
                                activeClassName={this.selectedClasses}
                                className={this.unselectedClasses}
                                onClick={() => { this.mobileExpandCollapseSidebar(false) }}
                            >
                                <Icons.Home className="ml-6" />
                                    <div className="ml-10 whitespace-no-wrap ">{config.home}</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/yourJobs"
                                activeClassName={this.selectedClasses}
                                className={this.unselectedClasses}
                                onClick={() => { this.mobileExpandCollapseSidebar(false) }}
                            >
                                <Icons.GitBranch className="ml-6" />
                                    <div className="ml-10 whitespace-no-wrap" >{config.yourJobs}</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/manageJobs"
                                activeClassName={this.selectedClasses}
                                className={this.unselectedClasses}
                                onClick={() => { this.mobileExpandCollapseSidebar(false) }}
                            >
                                <Icons.Edit3 className="ml-6" />
                                    <div className="ml-10 whitespace-no-wrap" >{config.manageJobs}</div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div >
        );
    }
}
export default Sidebar;
