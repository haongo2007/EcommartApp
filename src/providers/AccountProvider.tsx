"use client";

import React, { createContext, useContext, useState } from "react";
import { AccountSession } from "../types/types";

interface AccountContextValues {
  account: AccountSession;
  setAccount: (user: AccountSession) => void;
  // isAdmin: boolean;
}
export const AccountContext = createContext<AccountContextValues>({
  account: undefined,
  setAccount: () => {},
  // isAdmin: false,
});

export const useAccountContext = () => useContext(AccountContext);

interface AccountContextProviderProps {
  children: React.ReactNode;
  account: AccountSession;
  // isAdmin: boolean;
}

const AccountProvider = ({
  children,
  account,
  // isAdmin,
}: AccountContextProviderProps) => {
  const [accountSession, setAccountSession] = useState<AccountSession>(account);
  return (
    <AccountContext.Provider
      value={{
        account: accountSession,
        setAccount: setAccountSession,
        // isAdmin,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
