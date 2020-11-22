import React, { createContext, useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { Profile } from '../Firebase/firebase_interfaces';
export const ProfileContext = createContext<any>({});

const ProfileContextProvider = (props: any) => {

  const [profile, setProfile]: [Profile, Function] = useState(
    {
      uid: "",
      email: "",
      firstName: "",
      lastName: "",
      onBoarding: 0,  // Step in the onboarding 0: not started | 10: finish
    }
  );

  const changeKey = async (key: keyof Profile, value: string | number) => {
    console.log("changement: ", key, " :", value);
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