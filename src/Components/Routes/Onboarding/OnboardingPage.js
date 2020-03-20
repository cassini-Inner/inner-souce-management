import React from "react";
import SplitContainerWithImage from "../../Containers/SplitContainerWithImage";
import TextInput from "../../Common/InputFields/TextInput";
import SearchTagsInput from "../../Common/InputFields/SearchTagsInput";
import Button from "../../Common/Button/Button";
import { Link } from "react-router-dom";

const OnboardingPage = (props) => {
    const body = (
        <div className="flex flex-col w-full px-4 font-semibold ">
            <p className="text-lg text-nebula-grey-600 mb-4">Hello,</p>
            <p className="text-3xl">Tushar Paliwal</p>

            <p className="text-lg text-nebula-grey-600 mt-2">Before we get
              started, we’d like get to know you a little better.</p>

            <label className="mt-10">Your position in company</label>
            <TextInput placeholder={"Position"}/>
            <label className="mt-10">Your department</label>
            <TextInput placeholder={"Department"}/>
            <label className="mt-10">Skills & areas of interest</label>
            <SearchTagsInput placeholder="Type and press enter to add skills"/>
            {/*TODO: Remove this link when implementing onboarding logic*/}
            <Link to="/" >
                <Button label="Let's go!" type="primary" className="px-8 mt-24"/>
            </Link>
        </div>
    );

    return (
        <SplitContainerWithImage body={body}/>
    );
};

export default OnboardingPage;
