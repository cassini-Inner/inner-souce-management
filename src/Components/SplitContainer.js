import React from 'react';
import { BackIcon } from './Icons';
import { withRouter } from 'react-router';

const SplitContainer = (props) => {

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div className="bg-white flex flex-col lg:flex-row mx-auto ">
      <div
        className="bg-white flex-col flex lg:sticky fixed lg:h-screen lg:top-0 lg:overflow-y-auto lg:w-1/2 lg:w-1/2 ">
        <div className="px-5 py-5 lg:px-10 lg:py-12 lg:pt-5">
          <div className="cursor-pointer select-none hover:text-nebula-blue" onClick={goBack} >
            <div className="flex">
              <BackIcon />
              <p className="text-base pl-2 leading-snug">Back</p>
            </div>
          </div>
        </div>
        <div className="px-2 pb-40 lg:px-10">
          {props.leftView}
        </div>
        <div className="sticky bottom-0 bg-white px-6 pb-4 justify-end">
          <hr />
          <div className="mt-2 mx-2 mb-4">
            <div
              className="text-nebula-blue text-base font-semibold leading-tight">{props.statusTitle}</div>
            <div
              className="text-nebula-grey-800 text-sm leading-tight">{props.statusSubtitle}</div>
          </div>
          <div className="flex w-full justify-evenly flex-col md:flex-row">
            {
              props.actions ?
                props.actions.map((button, index) => {
                  return (
                    <div className={" ml-1 mr-1 my-2 w-full"}>
                      {button}
                    </div>
                  );
                })
                : ''
            }
          </div>
        </div>
      </div>
      <div
        className="w-full px-4  lg:overflow-y-auto bg-white lg:w-2/3 lg:px-10 py-16  lg:h-screen">
        {props.rightView}
      </div>
    </div>
  );
};

export default withRouter(SplitContainer);
