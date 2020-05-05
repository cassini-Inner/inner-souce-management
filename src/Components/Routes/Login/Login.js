import React from "react";
import { withRouter } from "react-router-dom";
import * as Icons from "react-feather";
import SplitContainerWithImage from "../../Containers/SplitContainerWithImage";
import { githubAuthUrl } from "../../../Configuration";

const LoginPage = (props) => {
    const body = (
        <div className="max-w-screen-sm w-full px-4 lg:px-8">
            <div className="leading-none font-semibold">
                <p className="text-4xl">Welcome to</p>
                <p className="text-5xl text-nebula-blue">Innersource</p>
            </div>
            <p
                className="text-nebula-grey-600 mt-5 font-semibold text-lg">
              Innersource helps you find awesome projects and collaboration opportunities within your organisation.
            </p>
            {
                // (props.location.state && props.location.state.msg) 
                // ?
                //     <p className="mt-12 mb-6 text-nebula-red">{props.location.state.msg}</p>
                // :
                <p className="mt-12 mb-6 text-nebula-grey-600">To get started, sign in with your GitHub account</p>
            }
            
            <button className="w-full md:w-auto" onClick={()=>Authenticator()}>
                <div className="flex w-full bg-nebula-grey-800 px-4 h-12 rounded shadow-lg items-center hover:shadow-2xl hover:bg-nebula-grey-900 transition duration-300 lg:px-12">
                    <Icons.GitHub className="text-white "/>
                    <p className="px-6 text-white font-semibold whitespace-no-wrap">Continue with GitHub</p>
                </div>
            </button>
        </div>
    );
    return (
        <SplitContainerWithImage body={body}/>
    );
};

const Authenticator = () => {
    window.open(githubAuthUrl, "_self");
};


export default withRouter(LoginPage);
