import React, { createContext, useState } from 'react';
import firebase from 'firebase';
import { Field } from '../Firebase/ConstantContext';
import { InitSchool, School } from '../Firebase/SchoolsContext';

export interface EducationType {
  institution: School, // Ecole de ..
  area: string, // Software development
  studyType?: string, // bachelor
  startDate?: firebase.firestore.Timestamp,
  endDate?: firebase.firestore.Timestamp,
  gpa?: string,
  courses?: Array<String>,
  fields?: Array<Field>,
  location?: LocationItemType,
}

export const initEducation = {
  institution: InitSchool,
  area: "",
}

export interface LocationItemType {
  address: string,
  postalCode: string,
  city: string,
  countryCode: string,
  region: string
}

export interface SocialItem {
  network: string,
  username: string,
  url: string
}

export interface Basics {
  email: string, // "john@gmail.com"
  uid: string, //Same uid as the user
  firstName?: string,
  lastName?: string,
  birthday?: firebase.firestore.Timestamp,
  promotion?: number,
  label?: string, // "Programmer"
  picture?: string, // "",
  phone?: string, // "(912) 555-4321"
  website?: string, // "http://johndoe.com"
  summary?: string, //"A summary of John Doe..."
  location?: LocationItemType,
  profiles?: Array<SocialItem>
}

export const initBasics: Basics = {
  firstName: "",
  lastName: "",
  email: "",
  uid: "",
  promotion: new Date().getFullYear(),
}

export interface ProfileMeta {
  lastEditDate: firebase.firestore.Timestamp,
  onBoarding: number,
}

export const initProfileMeta = {
  lastEditDate: firebase.firestore.Timestamp.now(),
  onBoarding: 0,  // Step in the onboarding 0: not started | 10: finish
}
export interface WorkType {
  company: string, // "Company",
  position: string, // "President",
  website?: string, //"http://company.com",
  startDate?: firebase.firestore.Timestamp,// "2013-01-01",
  endDate?: firebase.firestore.Timestamp, // "2014-01-01",
  summary?: string, // "Description...",
  highlights?: Array<String>,
}
export interface Profile {
  basics: Basics,
  metadata: ProfileMeta,
  work?: Array<WorkType>,
  educations?: Array<EducationType>,
}


export const initProfile: Profile = {
  basics: {
    email: "",
    uid: "",
    promotion: new Date().getFullYear(),
  },
  metadata: {
    lastEditDate: firebase.firestore.Timestamp.now(),
    onBoarding: 0,  // Step in the onboarding 0: not started | 10: finish
  }
};

export interface ProfileContextInterface {
  profile: Profile,
  setProfile: Function,
  basics: Basics,
  profileMeta: ProfileMeta,
  educations: Array<EducationType>,
  setEducations: Function,
  changeBasics: Function,
  getProfile?: Function,
  setBasics: Function,
  setProfileMeta: Function,
  changeProfileMeta: Function,
}

export const ProfileContext = createContext<ProfileContextInterface>({
  profile: initProfile,
  basics: initBasics,
  profileMeta: initProfileMeta,
  educations: [initEducation],
  changeProfileMeta: () => console.log("Context not initiated"),
  changeBasics: () => console.log("Context not initiated"),
  setBasics: () => console.log("Context not initiated"),
  setProfileMeta: () => console.log("Context not initiated"),
  setProfile: () => console.log("Context not initiated"),
  setEducations: () => console.log("Context not initiated"),
});

const ProfileContextProvider = (props: any) => {


  const [basics, setBasics]: [Basics, Function] = useState(initBasics);
  const [educations, setEducations]: [Array<EducationType>, Function] = useState([initEducation]);
  const [profileMeta, setProfileMeta]: [ProfileMeta, Function] = useState(initProfileMeta);


  const changeBasics = async (key: keyof Basics, value: string | number) => {
    await setBasics({
      ...basics,
      [key]: value
    });
  }

  const changeProfileMeta = async (key: keyof ProfileMeta, value: string | number | firebase.firestore.Timestamp) => {
    await setProfileMeta({
      ...profileMeta,
      [key]: value
    });
  }


  const profile = {
    basics: basics,
    metadata: profileMeta,
    educations: educations,
  }

  const setProfile = (profile: Profile) => {
    console.log("SETTING PROFILE", profile);
    if (profile.metadata)
      setProfileMeta(profile.metadata);
    if (profile.basics)
      setBasics(profile.basics);
    if (profile.educations)
      setEducations(profile.educations);
    console.log("BASICS", basics);

  }


  return (
    <ProfileContext.Provider
      value={{
        profile,
        basics,
        educations,
        setEducations,
        profileMeta,
        changeBasics,
        changeProfileMeta,
        setProfileMeta,
        setProfile,
        setBasics,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider;