import React from 'react';

const ModalContainer = (props) => {
	if (props.state.display) {
		disableScroll();
		return (
			<div className="fixed w-screen h-screen flex justify-center items-center z-50">
				<div className="w-full h-full fixed bg-black opacity-25">
				</div>
				<div id="modal" className={'flex-col fixed  w-screen h-screen  bg-white p-6 justify-end items-end md:w-auto md:h-auto ' + props.state.class}>
					<div id="header" className="text-lg mb-2">{props.state.header}</div>
					<hr />
					<div id="content" className="mt-4 mb-4 bg-white max-w-xl">{props.state.content}</div>
					<hr />
					<div id="footer" className="mt-2 flex-col">
						{
							props.state.information ?
								<div id="information" className="flex-1 p-2">
									{props.state.information}
								</div> : ""
						}
						{
							props.state.buttons ?
								<div id="buttons" className="p-2">
									{props.state.buttons}
								</div>
								: ""
						}
					</div>

				</div>
			</div>
		);
	}
	else {
		enableScroll();
		return ('');
	}
};

const disableScroll = () => {
	let name = "overflow-y-hidden";
	let arr = document.body.className.split(" ");
	document.body.className += " " + name;
}

const enableScroll = () => {
	let name = 'overflow-y-hidden';
	let arr = document.body.className.split(' ');
	arr[arr.indexOf(name)] = 'overflow-y-scroll';
	document.body.className = arr.join('');
};



// const setInformation
export default ModalContainer;