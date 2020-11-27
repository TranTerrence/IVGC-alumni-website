import React, { createContext, useState, useEffect, useContext } from 'react';

export interface User {
  uid: string,
  email: string,
  creationDate: firebase.firestore.Timestamp,
  role: string,
  verified: boolean,
}


export const UserContext = createContext<any>({});

const UserContextProvider = (props: any) => {

  let initUser = {
    uid: "",
    email: "",
    role: "",
    verified: false, // Step in the onboarding 0: not started | 10: finish
  };
  const [user, setUser]: [Partial<User>, Function] = useState(initUser);

  const changeKey = async (key: keyof User, value: string | number) => {
    await setUser({ ...user, [key]: value });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        changeKey
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;