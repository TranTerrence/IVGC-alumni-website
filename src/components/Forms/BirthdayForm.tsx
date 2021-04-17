import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Basics, ProfileContext } from "../Profile/ProfileContext";


export const BirthdayForm = () => {
  const firebase = useContext(FirebaseContext);
  const { basics, changeBasics }: { basics: Basics, changeBasics: Function } = useContext(ProfileContext);
  return (
    <KeyboardDatePicker
      margin="normal"
      id="date-picker-dialog"
      label="Date d'anniversaire"
      inputVariant="outlined"
      cancelLabel="Annuler"
      format="dd/MM/yyyy"
      openTo="year"
      views={["year", "month", "date"]}
      disableFuture
      minDate={new Date("01/01/1950")}
      invalidDateMessage="Mauvaise date"
      value={
        basics.birthday
          ? basics.birthday.toDate()
          : null}
      initialFocusedDate={new Date().setFullYear(new Date().getFullYear() - 20)}
      onChange={(date) => {
        if (date !== null)
          changeBasics("birthday", firebase?.toTimestamp(date));
      }}
      KeyboardButtonProps={{
        'aria-label': "date anniversaire",
      }}
    />
  );
}
