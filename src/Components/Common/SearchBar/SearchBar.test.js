import React from "react";
import { shallow } from "enzyme";
import SearchBar from "./SearchBar";
import { SearchIcon } from "../Icons";


describe("<SearchBar />", () => { 
    it("should render SearchIcon", () => {
        const wrapper = shallow(<SearchBar />);
        expect(wrapper.find(SearchIcon)).toHaveLength(1);
    });
});