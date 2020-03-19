import * as Icons from "react-feather";
import React from "react";

const SearchBar = (props) => {
    let inputClasses = "h-12 focus:outline-none rounded py-2 block w-full appearance-none leading-normal ";
    return (
        <div className={"flex-1 flex items-center rounded " + props.className}>
            <Icons.Search className="h-4 w-4 stroke-current text-nebula-grey-500 mx-5"/>
            {/* Input for Search */}

            <input
                type="text"
                className={props.inputClass
                    ? inputClasses + props.inputClass
                    : inputClasses}
                placeholder={props.placeholder
                    ? props.placeholder
                    : "Search for jobs and projects by name, creator and skills needed"}
            />
        </div>
    );
};

export default SearchBar;
