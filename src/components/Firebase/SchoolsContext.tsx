import React, { createContext, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collections } from '../../constants/firebase';
import FirebaseContext from './context';



export type SchoolTypes = "Université" | "Grande école" | "Autres";
export interface School {
  name: string,
  city: string,
  country: string,
  address?: string,
  type: SchoolTypes,
  website?: string,
}

export const InitSchool: School = {
  name: "",
  city: "",
  country: "France",
  type: "Université",
}
export interface SchoolsContextInterface {
  schools: Array<School>,
  loading: boolean,
  error: Error | undefined,
}

export const SchoolsContext = createContext<SchoolsContextInterface>({
  schools: [], loading: true, error: undefined
});

const SchoolsContextProvider = (props: any) => {

  const firebase = useContext(FirebaseContext);
  let [schools, loading, error] = useCollectionData<School>(
    firebase?.firestore.collection(collections.schools)
  );
  if (schools === undefined)
    schools = [];



  return (
    <SchoolsContext.Provider
      value={{ schools, loading, error, }}
    >
      {props.children}
    </SchoolsContext.Provider>
  )
}

export default SchoolsContextProvider;