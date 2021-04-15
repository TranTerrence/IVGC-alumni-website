import { Box, Grid, Typography, Button, IconButton, Avatar } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { ProfileContext } from "../../../components/Profile/ProfileContext";
import { ButtonNext } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import Fade from "@material-ui/core/Fade";
import { MascotAvatar } from "../../../components/MascotAvatar";
import { MASCOT_NAME } from "../../../constants/names";
import PublishIcon from '@material-ui/icons/Publish';
import FirebaseContext from "../../../components/Firebase/context";
import { storages } from '../../../constants/firebase';
import CircularProgressWithLabel from "../../../components/CircularProgressWithLabel";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "firebase";

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: palette.primary.main,
      },
    },
  },
  speakerName: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  input: {
    display: 'none',
  },
  profilPic: {
    width: theme.spacing(24),
    height: theme.spacing(24),
    border: theme.spacing(2)

  },
}));


export const AskPicture = () => {
  const classes = useStyles();
  const { basics, changeBasics } = useContext(ProfileContext);
  const imagePath = basics.picture;
  let name = imagePath?.substr(imagePath?.indexOf('%2F') + 3, (imagePath?.indexOf('?')) - (imagePath?.indexOf('%2F') + 3));
  let picName = name?.replaceAll("%20", " ");
  const firebaseContext = useContext(FirebaseContext);
  const storageRef = firebaseContext?.storage.ref(storages.profilePics);
  const [fileName, setFileName] = useState<string>(picName ?? "");
  const [progress, setProgress] = useState<number>(0); //To 100 if finished


  const deleteFile = async () => {
    await storageRef?.child('/' + fileName).delete();
    setFileName("");
    setProgress(0);
    changeBasics("picture", null); // Get URL
    firebaseContext?.updateProfile({ basics: { ...basics, picture: "" } });

  }


  const uploadFile = (event: React.ChangeEvent<HTMLInputElement> | null) => {
    let fileObj = null;
    let files = null;
    files = event?.target?.files;
    fileObj = files ? files[0] : null;

    if (fileObj) {
      const fileNameWithId = fileObj.name;
      const fileRef = storageRef?.child('/' + fileNameWithId);
      const uploadTask = fileRef?.put(fileObj);
      // Listen for state changes, errors, and completion of the upload.
      setFileName(fileNameWithId);

      uploadTask?.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        async (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              break;
          }
          if ((snapshot.bytesTransferred / snapshot.totalBytes) === 1) {
            const picUrl = await snapshot.ref.getDownloadURL();
            changeBasics("picture", picUrl); // Get URL
            firebaseContext?.updateProfile({ basics: { ...basics, picture: picUrl } });
          }

        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
      )
    }
  }

  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row" >
          <Grid item >
            <MascotAvatar className={classes.avatar} />
          </Grid>
          <Grid item container direction="column" xs>
            <Typography variant="body1" className={classes.speakerName} >{MASCOT_NAME}</Typography>
            <Typography variant="body2" >Peux-tu ajouter une photo?</Typography>

            {
              progress !== 0 || basics.picture
                ? <Grid item container style={{ display: "flex", alignItems: "center" }} spacing={2} direction="row">
                  <Grid item >
                    <Avatar alt="Photo de profil" src={basics?.picture} className={classes.profilPic} />
                    <Typography >{"📎 " + fileName}</Typography>


                  </Grid>
                  {
                    progress === 100 || basics.picture
                      ? <Grid item xs container style={{ display: "flex", alignItems: "center" }} ><CheckCircleIcon color="primary" /> <IconButton aria-label="delete" onClick={deleteFile}>
                        <DeleteIcon />
                      </IconButton></Grid>
                      : <CircularProgressWithLabel value={progress} />
                  }

                </Grid>
                : <Grid item >
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    onChange={event => uploadFile(event)}
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="outlined" color="primary" component="span" startIcon={<PublishIcon />}>
                      Ajouter une photo
                    </Button>
                  </label>

                </Grid>
            }

            <Grid item>
              <ButtonNext text="Suivant" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}

