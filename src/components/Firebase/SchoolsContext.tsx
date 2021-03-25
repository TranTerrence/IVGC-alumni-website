import React, { createContext, useState, useEffect, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collections, constants } from '../../constants/firebase';
import FirebaseContext from './context';

export interface School {
  fields: {
    aca_nom: string,
    adresse_uai: string,
    code_postal_uai?: string,
    compte_facebook?: string,
    compte_instagram?: string,
    compte_linkedin?: string,
    compte_twitter?: string,
    compte_youtube?: string,
    date_creation?: string,
    uo_lib: string, // Nom de l'école
    uo_lib_officiel: string,
    url: string,  // site de l'école
    wikipedia?: string,
    wikipedia_en?: string,
    nom_court?: string,


  },
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