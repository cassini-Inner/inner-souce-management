import React, { useMemo } from "react";
import { useAuthentication } from "./hook";
import PropTypes from "prop-types";
export const AuthenticationContext = React.createContext();

export function AuthenticationProvider({ children }) {
    const authState = useAuthentication();

    const contextValue = useMemo(() => {
        return authState;
    }, [authState]);

    return (
        <div>
            <AuthenticationContext.Provider value={contextValue}>
                {children}
            </AuthenticationContext.Provider>
        </div>
    );
}

AuthenticationProvider.propTypes = {
    children: PropTypes.element,
};