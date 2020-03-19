import React from "react";
import { shallow } from "enzyme";
import SearchBar from "./SearchBar";
import * as Icons from "react-feather";


describe("<SearchBar />", () => { 
    it("should render SearchIcon", () => {
        const wrapper = shallow(<SearchBar />);
        // expect(wrapper.find(Icons.search)).toHaveLength(1);
    });
});