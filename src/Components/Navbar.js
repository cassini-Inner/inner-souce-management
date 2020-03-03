import React, { Component } from 'react';

class Navbar extends Component {
    
    render() {
        return(
            <div className="flex h-20">
                <div className="w-4/5 ml-10 h-12 my-4 flex rounded-md bg-nebula-grey-400">

                    {/* Svg for Search Icon */}

                    <svg className="ml-5 mt-5 w-4 h-4 fill-current text-nebula-grey-600" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.3" filter="url(#filter0_d)">
                        <path d="M10.3333 12.6667C13.2789 12.6667 15.6667 10.2789 15.6667 7.33333C15.6667 4.38781 13.2789 2 10.3333 2C7.38781 2 5 4.38781 5 7.33333C5 10.2789 7.38781 12.6667 10.3333 12.6667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 14.0001L14.1 11.1001" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <filter id="filter0_d" x="-1" y="0" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                            {/* <feOffset dy="4"/> */}
                            {/* <feGaussianBlur stdDeviation="2"/> */}
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                        </defs>
                    </svg>

                    {/* Input for Search */}

                    <input type="text" className="p-3 mt-1 h-10 w-4/5 bg-nebula-grey-400 placeholder-nebula-grey-600 stroke-current text-nebula-grey-600 focus:outline-none" placeholder="Search for jobs and projects by name, creator and skills required"></input>
                </div>

                {/* Svg for notifications */}

                <svg className="mt-6 ml-8 w-8 h-8 rounded-full p-1 bg-nebula-grey-400 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <img src="../assets/icons/Ellipse 1.png" className="mt-6 ml-4 w-8 h-8"/>
            </div>
        );
    }
}

export default Navbar;