import React, { Component } from 'react';

export const PrimaryButton = (props) => {
    return(
        <button className="rounded pl-6 pr-6 text-center bg-nebula-blue text-white text-md">{props.name}</button>
    );
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

export const AuthorInfo = () => {
    return(
        <div className="flex">
             <img src="../assets/icons/image 1.png" className="mt-1 w-10 h-10 "/>
            <div className="pl-2">
                <p className="font-semibold">Carl Johnson</p>
                <p className="leading-tight text-s text-nebula-grey-600">Risk Analysis</p>
                {/* <p className="leading-tight text-s ">created on 17/01/2020</p> */}
            </div>
        </div>
    );
} 


