import { createContext,useEffect,useMemo, useReducer } from "react";

// ============================================================
// SET "rtl" OR "ltr" HERE
// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCALSTORAGE
const INITIAL_STATE = {
    direction: "ltr",
};
export const SettingsContext = createContext({
    settingState: INITIAL_STATE,
    settingDispatch: (arg) => {},
});

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_DIRECTION":
            window.localStorage.setItem("ecfl_settings",JSON.stringify(action.payload));
            return { ...state, direction: action.payload };
        default: {
            return state;
        }
    }
};
// ============================================================
const SettingsProvider = ({ children }) => {
    const [settingState, settingDispatch] = useReducer(reducer, INITIAL_STATE);

    const contextValue = useMemo(
        () => ({
            settingState,
            settingDispatch,
        }),
        [settingState, settingDispatch]
    );

    useEffect(() => {
        if (!window) return null;
        const getItem = window.localStorage.getItem("ecfl_settings");
        if (getItem) settingDispatch({
            type: "UPDATE_DIRECTION",
            payload: JSON.parse(getItem),
        });
    }, []);
    return (
        <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
    );
};

export default SettingsProvider;
