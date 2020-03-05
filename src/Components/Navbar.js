import React, { Component } from 'react';
import { SearchIcon } from "./Icons";

class Navbar extends Component {

    render() {
        return (
            <div className="h-24 bg-nebula-grey-200 items-center flex ml-10 ">
                <div className="flex-1 flex items-center h-12">
                    <div className="flex-1 flex items-center bg-nebula-grey-400 h-12 rounded mr-4">
                        <SearchIcon className="h-4 w-4 stroke-current text-nebula-grey-500 mx-5" />
                        {/* Input for Search */}

                        <input
                            type="text"
                            className="h-12 bg-nebula-grey-400 focus:outline-none rounded py-2 block w-full appearance-none leading-normal placeholder-nebula-grey-500"
                            placeholder="Search for jobs and projects by name, creator and skills needed"
                        />
                    </div>

                    {/* Svg for notifications */}

                    <div className="flex-0 bg-nebula-grey-400 mr-4 rounded-full h-12 w-12 flex items-center">
                        <svg className="h-6 w-6 flex-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <img src="../assets/icons/Ellipse 1.png" className="flex-0 h-12 w-12 rounded-full" />
                </div >
            </div>
        );
    }
}

export default Navbar;