import React from 'react';
import { BackIcon } from './Icons';
import { withRouter } from 'react-router';

const SplitContainer = (props) => {

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div className="bg-white lg:flex-row lg:max-w-screen-xl mx-auto ">
      <div className="md:flex">
        <div
          className="bg-white flex-col flex md:sticky md:top-0 md:overflow-y-auto  md:w-1/2 md:h-screen lg:h-screen lg:w-1/2 ">
          <div className="px-5 py-5 flex-1 lg:px-10 lg:py-12 lg:pt-5">
            <div className="cursor-pointer select-none hover:text-nebula-blue" onClick={goBack} >
              <div className="flex">
                <BackIcon />
                <p className="text-base pl-2 leading-snug">Back</p>
              </div>
            </div>
            {props.leftView}
          </div>

          <hr />
          <div className="sticky bottom-0 bg-white px-6 py-4 justify-end">
            <div className="mt-0 mb-4">
              <div
                className="text-nebula-blue text-base font-semibold leading-tight">{props.statusTitle}</div>
              <div
                className="text-nebula-grey-800 text-sm leading-tight">{props.statusSubtitle}</div>
            </div>
            <div className="flex w-full justify-end">
              {
                props.actions ?
                  props.actions.map((button, index) => {
                    return (
                      <div className={"flex-1 ml-2"}>
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
    </div>
  );
};

export default withRouter(SplitContainer);
