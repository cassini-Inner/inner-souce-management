import React from "react";
import SplitContainerWithImage from "../../Containers/SplitContainerWithImage";
import TextInput from "../../Common/InputFields/TextInput";
import SearchTagsInput from "../../Common/InputFields/SearchTagsInput";
import Button from "../../Common/Button/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { USER_SIGN_IN } from "../../../Store/actions";
import { useCookies } from 'react-cookie';

const OnboardingPage = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'githubName', 'id']);
    // const profile = props.location.state.profile;
    // if(props.user)
    // if(cookies.githubName && !props.loggedIn) {
        // props.setUserData(profile);

    // }
    const body = (
        <div className="flex flex-col w-full px-4 font-semibold ">
            <p className="text-lg text-nebula-grey-600 mb-4">Hello,</p>
            <p className="text-3xl">{cookies.githubName}</p>

            <p className="text-lg text-nebula-grey-600 mt-2">Before we get
              started, we’d like get to know you a little better.</p>

            <label className="mt-10">Your Full Name</label>
            <TextInput placeholder="Full Name"/>
            <label className="mt-10">Your position in company</label>
            <TextInput placeholder="Position"/>
            <label className="mt-10">Your department</label>
            <TextInput placeholder="Department"/>
            <label className="mt-10">Contact</label>
            <TextInput placeholder="Email, Slack ID..."/>
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


const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      setUserData: (profile) => dispatch({ type: USER_SIGN_IN, payload: {profile: profile}})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OnboardingPage));

