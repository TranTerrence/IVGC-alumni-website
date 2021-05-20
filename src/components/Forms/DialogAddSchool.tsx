import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useContext, useState } from "react";
import { palette } from "../../constants/colors";
import { FirebaseContext } from "../Firebase";
import { InitSchool, School, SchoolTypes } from "../Firebase/SchoolsContext";


const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: palette.primary.main,
      },
    },
  },
}));

export const DialogAddSchool = () => {
  const [open, setOpen] = useState(true);
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();
  const [school, setSchool] = useState<School>(InitSchool);
  const schoolTypes: Array<SchoolTypes> = ["Université", "Grande école", "Autres"];

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="dialog-add-school">Ajouter une école</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              id="school_name"
              label="Nom de l'école"
              name="school_name"
              value={school.name}
              onChange={(e) => {
                setSchool({ ...school, name: e.target.value });
              }}
              variant="outlined"
              autoFocus
              className={classes.textField} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              id="school_city"
              label="Ville"
              name="school_city"
              value={school.city}
              onChange={(e) => {
                setSchool({ ...school, city: e.target.value });
              }}
              variant="outlined"
              autoFocus
              className={classes.textField} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              id="school_address"
              label="Adresse"
              name="school_address"
              value={school.address}
              onChange={(e) => {
                setSchool({ ...school, address: e.target.value });
              }}
              variant="outlined"
              autoFocus
              className={classes.textField} />
          </Grid>
          <Grid item xs={12}>

            <Autocomplete
              id="school_type"
              options={schoolTypes}
              onChange={(event, value) => setSchool({ ...school, type: value })}
              value={school.type}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type d'établissement"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              id="school_website"
              label="Site internet"
              name="school_website"
              value={school.website}
              onChange={(e) => {
                setSchool({ ...school, website: e.target.value });
              }}
              variant="outlined"
              autoFocus
              className={classes.textField} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Annuler
     </Button>
        <Button variant="contained" color="primary" onClick={() => {
          firebase?.addSchool(school);
          handleClose();
        }
        }>
          Ajouter
      </Button>
      </DialogActions>
    </Dialog>
  );
}

