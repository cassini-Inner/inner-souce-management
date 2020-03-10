import React, { useState } from 'react';
import { ChevronDownIcon, SearchIcon, CloseIcon } from './Icons';


export const Button = (props) => {
	switch (props.type) {
		case "primary": return (<button className="rounded font-semibold px-4 py-2 text-center bg-nebula-blue text-white transition duration-150 shadow-none hover:shadow-lg text-sm h-12" onClick={props.onClick} >{props.label}</button>);
		case "secondary": return (<button className="rounded font-semibold px-4 py-2 text-center bg-nebula-blue-light transition duration-150 shadow-none hover:shadow-lg text-nebula-blue border-2 border-nebula-blue text-sm h-12" onClick={props.onClick} >{props.label}</button>);
		default: <button className="rounded font-semibold px-4 py-2 text-center bg-nebula-blue text-white text-sm">{props.label}</button>;
	}
};


export const StatusTag = (props) => {
	let statusTags = [...props.statusTag];
	const style = {
		open: "bg-nebula-blue-light text-nebula-blue",
		applied: "bg-nebula-yellow-light text-nebula-yellow",
		ongoing: "bg-nebula-green-light text-nebula-green",
		completed: "bg-nebula-purple-light text-nebula-purple",
	};
	return statusTags.map((tag) => <div key={tag} className={style[tag] + " px-2 py-1 mr-2 font-bold rounded tracking-widest inline text-xs"}>{tag.toUpperCase()}</div>);
};

export const InfoTag = (props) => {
	let content = "";
	if (Array.isArray(props.data)) {
		length = props.data.length - 1;
		for (let [index, value] of props.data.entries()) {
			content += value + (index < length ? ", " : "");
		}
	}
	else
		content = props.data;
	return (
		<div className={props.className}>
			<div>
				<p className="font-semibold leading-tight tracking-widest text-xs text-nebula-grey-600 mb-2" >
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
};

export const AuthorInfo = () => {
	return (
		<div className="flex">
			<img src="../assets/icons/image 1.png" className="mt-1 w-8 h-8 " />
			<div className="pl-3">
				<p className="text-base font-semibold">Carl Johnson</p>
				<p className="leading-tight text-sm text-nebula-grey-600">Risk Analysis</p>
				{/* <p className="leading-tight text-s ">created on 17/01/2020</p> */}
			</div>
		</div>
	);
};


export const Dropdown = (props) => {

    let dropdownList = props.list.map((label) => { 
            return (
                <option value = { label } > { label } </option>
                )
            });

    // let dropdownList =  props.list.map((label) => { 
    //     return (
    //             <div className = "py-1 px-6 transition duration-150 hover:bg-nebula-grey-400"> 
    //                 { label } 
    //             </div>
    //         )
    //     });

    // const [state, setState] = useState({
    //     display: false,
        
    // });

    // const dropdownToggle = () => {
    //     setState({
    //         display: !state.display,
    //     });
    // }

	// return (
	// 	<div className="flex flex-wrap w-auto">
    //         <div className="pr-2 pt-2">
    //         {
    //             props.title ? 
    //                 <div className="flex text-base mb-2">
    //                     { props.title }
    //                 </div>
    //             : ""
    //         }
    //             <div 
    //                 className = { "rounded border boder-2 border-nebula-grey-200 flex bg-white p-2 h cursor-pointer " + (!state.display ? "transition duration-150 hover:bg-nebula-blue-light hover:text-nebula-blue hover:border-nebula-blue" : "") }
    //                 onClick = { dropdownToggle } >
	// 				<div className="flex">
	// 					<div className="flex-col text-lg font-semibold">
	// 						{ props.label }
    //                     { 
    //                         state.display ?
    //                             <div className = "py-2 bg-white rounded absolute flex-col border border-2 border-t-0 border-nebula-grey-300">
    //                             { dropdownList }
    //                             </div>
    //                         : ""
    //                     }

	// 					</div>
	// 					<ChevronDownIcon className="h-2 w-2 mt-1 ml-5" />
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
    // );

return (
		<div className="flex flex-wrap w-auto">
            <div className="pr-2 pt-2">
            {
                props.title ? 
                    <div className="flex text-base mb-2">
                        { props.title }
                    </div>
                : ""
            }
            <select id = { props.title } className = "rounded border border-2 border-nebula-grey-800 outline-none p-2 leading-tight">
                { dropdownList }
            </select>
			</div>
		</div>
    );
};

export const SearchBar = (props) => {
	let inputClasses = "h-12 focus:outline-none rounded py-2 block w-full appearance-none leading-normal ";
	return (
		<div className={"flex-1 flex items-center rounded " + props.className}>
			<SearchIcon className="h-4 w-4 stroke-current text-nebula-grey-500 mx-5" />
			{/* Input for Search */}

			<input
				type="text"
				className={props.inputClass ? inputClasses + props.inputClass : inputClasses}
				placeholder={props.placeholder ? props.placeholder : "Search for jobs and projects by name, creator and skills needed"}
			/>
		</div>
	);
};

export const TextInput = (props) => {
	return (
        <input type = "text" className =  { "pl-1 h-12 outline-none border-b-2 transition duration-300 focus:border-nebula-grey-600 " + props.className } placeholder = { props.placeholder } onKeyDown = { props.onKeyDown } />
	);
};

export const Tag = (props) => {
    return(
        <div className = {"flex bg-nebula-blue-light text-nebula-blue font-semibold px-2 py-1 font-semibold rounded tracking-widest inline text-xs " + props.className}>
            { props.label.toUpperCase()}
            <div id = { props.label } className = "hover:text-nebula-grey-800" onClick = { props.onClick } >
                <CloseIcon className = "pl-1 pb-1" />
            </div>
        </div>
    );
}


export const SearchTags = (props) => {
    const [ state, setState ] = useState({
        tagList: [],
        input: "",
    });
    
    const addTag = (event) => {
        state.input = event.target.value;
        if (event.key === 'Enter' && state.input.trim() !== "") {
            setState({
                tagList: [...state.tagList, state.input],
                input:"",
            })
            event.target.value = "";
        }
    }

    const removeTag = (event) => {
        let temp = [...state.tagList];
        temp.splice(temp.indexOf(event.currentTarget.id), 1);
        setState({
            tagList: temp,
            input: state.input,
        })
    }

    return(
        <div className = { props.className } >
            <TextInput className = "w-full" placeholder = { props.placeholder } onKeyDown = { addTag } />
            <div className="flex flex-row flex-wrap">
                {
                    state.tagList.map( (tag) => { 
                        return(
                            <Tag key = { tag } id = { tag } label = { tag } onClick = { removeTag } className="m-1 ml-0" />
                        );
                    })
                }
            </div>
        </div>
    );
}

