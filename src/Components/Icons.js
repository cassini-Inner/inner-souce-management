import React from 'react';

const iconClasses = "w-6 h-6 stroke-current";

export const HomeIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 22V12H15V22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    )
}

export const YourJobsIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 6H16C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 9V21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    )
}

export const DropdownIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10L12 16L18 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const ManageJobsIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M12 20H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
}
export const FilterIcon = (props) => {
    return (
        <svg className={props.class} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    );
}

export const SearchIcon = (props) => {
    return (
        <svg className={props.className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.0001 14L11.1001 11.1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export const NotificationIcon = (props) => {
    return (
        <svg className={"stroke-current " + props.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export const MenuIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.7308 6.27295L6.7308 18.2729" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.7308 6.27295L18.7308 18.2729" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}


export const CloseIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 6H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 18H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}


export const ChevronDownIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export const EditIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.1665 3.3335H3.33317C2.89114 3.3335 2.46722 3.50909 2.15466 3.82165C1.8421 4.13421 1.6665 4.55814 1.6665 5.00016V16.6668C1.6665 17.1089 1.8421 17.5328 2.15466 17.8453C2.46722 18.1579 2.89114 18.3335 3.33317 18.3335H14.9998C15.4419 18.3335 15.8658 18.1579 16.1783 17.8453C16.4909 17.5328 16.6665 17.1089 16.6665 16.6668V10.8335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.4165 2.0832C15.748 1.75168 16.1977 1.56543 16.6665 1.56543C17.1353 1.56543 17.585 1.75168 17.9165 2.0832C18.248 2.41472 18.4343 2.86436 18.4343 3.3332C18.4343 3.80204 18.248 4.25168 17.9165 4.5832L9.99984 12.4999L6.6665 13.3332L7.49984 9.99986L15.4165 2.0832Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export const DeleteIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 5H4.16667H17.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.6665 4.99984V3.33317C6.6665 2.89114 6.8421 2.46722 7.15466 2.15466C7.46722 1.8421 7.89114 1.6665 8.33317 1.6665H11.6665C12.1085 1.6665 12.5325 1.8421 12.845 2.15466C13.1576 2.46722 13.3332 2.89114 13.3332 3.33317V4.99984M15.8332 4.99984V16.6665C15.8332 17.1085 15.6576 17.5325 15.345 17.845C15.0325 18.1576 14.6085 18.3332 14.1665 18.3332H5.83317C5.39114 18.3332 4.96722 18.1576 4.65466 17.845C4.3421 17.5325 4.1665 17.1085 4.1665 16.6665V4.99984H15.8332Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.3335 9.1665V14.1665" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.6665 9.1665V14.1665" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export const BackIcon = (props) => {
    return (
        <svg className={iconClasses + " " + props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 19L5 12L12 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </svg>
    );
}

