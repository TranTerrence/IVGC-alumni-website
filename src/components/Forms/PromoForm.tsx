import { MenuItem, Select } from "@material-ui/core";
import React, { useContext } from "react";
import { ProfileContext } from "../Profile/ProfileContext";


export default function PromoForm() {
  const { basics, changeBasics } = useContext(ProfileContext);

  const getPromoMenuItems = () => {
    const promoItems = [];
    const thisYear = new Date().getFullYear();

    for (let year = 2016; year < thisYear + 3; year++) {
      promoItems.push(<MenuItem value={year} key={year}>{year}</MenuItem>)
    }
    return promoItems;
  }

  return (<Select
    labelId="promotion"
    id="promotion"
    value={basics.promotion}
    onChange={(e) => {
      changeBasics("promotion", e.target.value);
    }}          >
    {getPromoMenuItems()}
  </Select>)
}
