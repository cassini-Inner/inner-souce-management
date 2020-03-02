import React, { Component } from 'react';
import '../../assets/style/CommonComponents.css';

export const PrimaryButton = (props) => {
    return(
        <button className="rounded-md pl-6 pr-6 text-center bg-nebula-blue-main text-white text-lg">{props.name}</button>
    );
}

export const StatusTag = (props) => {
    let status = props.statusTag;
    return <div className={status + " p-1 font-semibold rounded-lg tracking-widest w-3 inline text-xs"}>{status.toUpperCase()}</div>
}

export const InfoTag = (props) => {
    let content;
    if(Array.isArray(props.data)) {
        length = props.data.length - 1;
        for(const [index,value] of props.data) {
            content += value + index<length?", ":"";
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