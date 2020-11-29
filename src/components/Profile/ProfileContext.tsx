import React, { createContext, useState, useEffect, useContext } from 'react';
import { PostFormation } from './PostFormation';

export interface Profile {
  uid: string, //Same uid as the user
  email: string,
  firstName: string,
  lastName: string,
  birthday: firebase.firestore.Timestamp,
  lastEditDate: firebase.firestore.Timestamp,
  onBoarding: number,
  promotion: number,
}

export const ProfileContext = createContext<any>({});

const ProfileContextProvider = (props: any) => {

  let initProfile = {
    uid: "",
    email: "",
    firstName: "",
    lastName: "",
    onBoarding: 0,  // Step in the onboarding 0: not started | 10: finish
  };
  const [profile, setProfile]: [Partial<Profile>, Function] = useState(initProfile);

  const changeKey = async (key: keyof Profile, value: string | number) => {
    await setProfile({ ...profile, [key]: value });
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        changeKey
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider;