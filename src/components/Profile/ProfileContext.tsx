import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from 'firebase';

export interface PostFormation {
  school: string, // School name
  city: string, // City of the school
  title: string, // Title of the diploma
  speciality: string,
  fields: string[],
  startDate: firebase.firestore.Timestamp,
  endDate: firebase.firestore.Timestamp,
}

export const initPostFormation = {
  school: "",
  city: "",
  title: "",
  speciality: "",
  fields: [],
  startDate: firebase.firestore.Timestamp.now(),
  endDate: firebase.firestore.Timestamp.now(),
};
export interface Profile {
  uid: string, //Same uid as the user
  email: string,
  firstName: string,
  lastName: string,
  birthday: firebase.firestore.Timestamp,
  lastEditDate: firebase.firestore.Timestamp,
  onBoarding: number,
  promotion: number,
  postFormations: PostFormation[],
};

export const initProfile: Profile = {
  uid: "",
  email: "",
  firstName: "",
  lastName: "",
  birthday: firebase.firestore.Timestamp.now(),
  lastEditDate: firebase.firestore.Timestamp.now(),
  onBoarding: 0,  // Step in the onboarding 0: not started | 10: finish
  promotion: new Date().getFullYear(),
  postFormations: [{ ...initPostFormation }],
};

export interface ProfileContextInterface {
  profile: Profile,
  setProfile: Function,
  changeKey: Function
}

export const ProfileContext = createContext<ProfileContextInterface>({
  profile: initProfile,
  setProfile: () => console.log("Context not initiated"),
  changeKey: () => console.log("Context not initiated"),
});

const ProfileContextProvider = (props: any) => {


  const [profile, setProfile]: [Profile, Function] = useState(initProfile);

  const changeKey = async (key: keyof Profile, value: string | number | PostFormation[]) => {
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