import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import * as Icons from "react-feather";
import SplitContainerWithImage from "../../Containers/SplitContainerWithImage";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
const LoginPage = () => {
    const auth = useContext(AuthenticationContext);
    const body = (
        <div className="flex flex-col max-w-screen-sm w-full h-full px-4 lg:px-8">
            <div className="my-auto">
                <div className="leading-none font-semibold">
                    <p className="text-4xl">Welcome to</p>
                    <p className="text-5xl text-nebula-blue">Nebula</p>
                </div>
                <p
                    className="text-nebula-grey-600 mt-5 font-semibold text-lg">
                Nebula helps you find awesome projects and collaboration opportunities within your organisation.
                </p>
                {
                    <p className="mt-12 mb-6 text-nebula-grey-600">To get started, sign in with your GitHub account</p>
                }
                <button className="w-full md:w-auto" onClick={() => auth.beginAuth()}>
                    <div className="flex w-full bg-nebula-grey-800 px-4 h-12 rounded shadow-md items-center hover:shadow-2xl hover:bg-nebula-grey-900 transition duration-300 lg:px-12">
                        <Icons.GitHub className="text-white " />
                        <p className="px-6 text-white font-semibold whitespace-no-wrap">Continue with GitHub</p>
                    </div>
                </button>
            </div>
        </div>
    );
    return (
        <SplitContainerWithImage body={body} />
    );
};
export default (withRouter(LoginPage));
