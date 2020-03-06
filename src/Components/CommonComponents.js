import React, { Component } from 'react';
import { DropdownIcon, SearchIcon } from './Icons';


export const Button = (props) => {
    switch(props.type) {
        case "primary": return (<button className="rounded pl-6 pr-6 text-center bg-nebula-blue text-white text-md h-12" onClick={ props.onClick } >{props.label}</button>);
        case "secondary": return (<button className="rounded pl-6 pr-6 text-center bg-nebula-blue-light text-nebula-blue border border-nebula-blue text-md h-12" onClick = { props.onClick } >{props.label}</button>);
        default : <button className="rounded pl-6 pr-6 text-center bg-nebula-blue text-white text-md">{props.label}</button>;
    }
}


export const StatusTag = (props) => {
    let statusTags = [...props.statusTag];
    const style = {
        open: "bg-nebula-blue-light text-nebula-blue",
        applied: "bg-nebula-yellow-light text-nebula-yellow",
        ongoing: "bg-nebula-green-light text-nebula-green",
        completed: "bg-nebula-purple-light text-nebula-purple",
    }
    return statusTags.map((tag) => <div key={tag} className={style[tag] + " px-2 py-1 mr-2 font-semibold rounded tracking-widest w-3 inline text-xs"}>{tag.toUpperCase()}</div>);
}

export const InfoTag = (props) => {
    let content="";
    if(Array.isArray(props.data)) {
        length = props.data.length -1;
        for(let [index,value] of props.data.entries()) {
            content += value + (index<length?", ":"");
        }            
    }
    else 
        content = props.data;
    return (
        <div>
            <div>
                <p className="font-semibold leading-tight tracking-widest text-xs text-nebula-grey-600 mb-2">
                    {props.title}
                </p>
            </div>
            <div>
                <p className="leading-tight font-semibold text-s">
                    {content}
                </p>
            </div>
        </div>
    );
}

export const AuthorInfo = (props) => {
    return(
        <div className = { "flex " + (props.className ? props.className : "") } >
             <img src="../assets/icons/image 1.png" className={"mt-1 "+ (props.iconClass ? props.iconClass : "")} />
            <div className="pl-2">
                <p className="font-semibold">Carl Johnson</p>
                <p className="leading-tight text-s text-nebula-grey-600">Risk Analysis</p>
                {props.date? <p className="leading-tight text-s ">created on 17/01/2020</p> : "" }
            </div>
        </div>
    );
} 


export const Dropdown = (props) => {
    return(
        <div className="flex flex-wrap w-auto">
            <div className="flex-col pr-2 pt-2">
                <div className="flex text-lg fmb-1">
                    { props.title }
                </div>
                <div className="flex bg-nebula-grey-200 p-2">
                    <div className="flex">
                        <div className="text-lg">
                            { props.name }
                        </div>
                            <DropdownIcon className="h-2 w-2 mt-1 ml-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const SearchBar = (props) => {
    let inputClasses = "h-12 focus:outline-none rounded py-2 block w-full appearance-none leading-normal ";
    return(
        <div className={"flex-1 flex items-center rounded "+props.className }>
            <SearchIcon className="h-4 w-4 stroke-current text-nebula-grey-500 mx-5" />
            {/* Input for Search */}

            <input
                type="text"
                className={ props.inputClass? inputClasses + props.inputClass : inputClasses }
                placeholder={ props.placeholder? props.placeholder : "Search for jobs and projects by name, creator and skills needed" }
            />
        </div>
    );
}