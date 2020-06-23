import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";
import { TranslateEnterAnimation } from "../../AnimationHelpers/TranslateMountWidget";

export const InitialLoadingPage = ({secondaryText}) => {
    const [loaderVisible, setLoaderVisible] = useState(false);

    useEffect(
        () => {
            setLoaderVisible(true);
            return (() => {setLoaderVisible(false);});
        },
        []
    );

    return (
        <TranslateEnterAnimation visible={loaderVisible}>
            <div className="w-screen h-screen relative flex justify-center items-center">
                <div className="mx-auto p-12 leading-tight flex flex-col items-center">
                    <p className="text-4xl font-semibold text-nebula-blue">Innersource</p>
                    {
                        secondaryText &&
                          <p className="text-lg text-nebula-grey-700 mt-8">{secondaryText}</p>
                    }
                    <div className="mx-auto pt-10">
                        <BarLoader color="#0066FF"/>
                    </div>
                </div>
            </div>
        </TranslateEnterAnimation>
    );
};
