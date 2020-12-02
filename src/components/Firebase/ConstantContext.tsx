import React, { createContext, useState, useEffect, useContext } from 'react';
import { constants } from '../../constants/firebase';
import FirebaseContext from './context';

interface field {
  field: string,
  category: string,
}

export const ConstantContext = createContext<field[]>([]);

const ConstantContextProvider = (props: any) => {

  const [fieldList, setFieldList]: [field[], Function] = useState([]);
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    const fetchFieldList = async () => {
      if (firebase) {
        const postFormation_constants = await firebase.getConstant(constants.postFormation);
        if (postFormation_constants !== null) {

          setFieldList(postFormation_constants.fieldList);
          console.log("get constants", postFormation_constants);
        }
      } else
        console.log("No firebase");
    }
    fetchFieldList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConstantContext.Provider
      value={fieldList}
    >
      {props.children}
    </ConstantContext.Provider>
  )
}

export default ConstantContextProvider;