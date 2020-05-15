import React from "react";
import { shallow } from "enzyme";
import SearchBar from "./SearchBar";
import * as Icons from "react-feather";


describe("<SearchBar />", () => { 
    it("should display passed placeholder", () => {
        const wrapper = shallow(<SearchBar placeholder="some test value"/>);
        expect(wrapper.find("some test value"));
    });
});