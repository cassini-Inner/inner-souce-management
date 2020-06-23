import React from "react";
import { CSSTransition } from "react-transition-group";

export const TranslateEnterAnimation = ({children, visible}) => {
    return (
        <CSSTransition
            timeout={300}
            appear
            in={visible}
            mountOnEnter
            unmountOnExit
            classNames={{
                enter: "transition duration-300 opacity-0 transform -translate-y-2",
                enterDone: "transition duration-300 opacity-100 transform translate-y-0",
                exit: "transition duration-300 opacity-100",
                exitDone: "transition duration-300 opacity-0"
            }}
        >
            {children}
        </CSSTransition>
    );
};
