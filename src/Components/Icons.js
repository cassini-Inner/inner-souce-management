import React from 'react';

const iconClasses = "w-1/6 pl-3 h-10 pt-3 pb-1 stroke-current text-white";

export const HomeIcon = (props) => {
    return (
        <svg className={iconClasses + (props.currentPage == "home"? " text-nebula-blue" : "")} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>
    )
}

export const YourJobsIcon = (props) => {
    return (
        <svg className={iconClasses + (props.currentPage == "yourJobs"? " text-nebula-blue" : "")} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 6H16C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9V21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>
    )
}

export const DropdownIcon = (props) => {
    return (
        <svg className={"w-1/6 h-2 mt-5 stroke-current " + (props.currentPage == "yourJobs"? " text-nebula-blue" : " text-white")} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.78525L7 7.78525L13 1.78525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export const ManageJobsIcon = (props) => {
    return (
        <svg className={iconClasses + (props.currentPage == "manageJobs"? " text-nebula-blue " : "")} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M12 20H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>
    );
}

export const SearchIcon = (props) => {
    return (
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
    );
}


export const FilterIcon = (props) => {
    return (
        <svg className={props.class} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
}

