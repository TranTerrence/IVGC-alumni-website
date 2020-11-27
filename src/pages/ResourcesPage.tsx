import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Firebase, { FirebaseContext } from '../components/Firebase';
import GetAppIcon from '@material-ui/icons/GetApp';
import { createNamedExports } from 'typescript';
import { formatBytes } from '../Utils';
import { Button, Container } from '@material-ui/core';


const FileRow = (props: { path: string }) => {

  const firebase = useContext(FirebaseContext);
  const { path } = props;

  const [metadata, setMetadata] = useState<firebase.storage.FullMetadata | null>(null);
  // Sync the data with the context
  useEffect(() => {
    const fetchMetadata = async () => {
      if (firebase) {
        const metadata_res = await firebase.getMetadata(path);
        setMetadata(metadata_res);
      } else
        console.log("No firebase");
    }
    fetchMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (metadata === null) {
    return null;
  }

  return (
    <React.Fragment>
      <TableRow >

        <TableCell component="th" scope="row">
          {metadata.name}
        </TableCell>
        <TableCell align="left">{formatBytes(metadata.size)}</TableCell>
        <TableCell align="right">
          <IconButton
            onClick={() => firebase?.downloadDocument(path, metadata.name)}
          ><GetAppIcon />
          </IconButton></TableCell>

      </TableRow>
    </React.Fragment>
  );
}
export default function ResourcesPage() {


  const firebase = useContext(FirebaseContext);

  const [paths, setPaths] = useState<string[]>([]);

  // Sync the data with the context
  useEffect(() => {
    const fetchResources = async () => {
      if (firebase) {
        const resources = await firebase.listResources();

        if (resources) {
          const paths_arr = resources.items.map(item => item.fullPath)
          console.log("RESOURCES ", paths);
          setPaths(paths_arr);
        }

      } else
        console.log("No firebase");
    }
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Container>
      <Typography variant="h2" color="primary">Ressources</Typography>
      <Typography variant="body1">Retrouvez ici tous les documents de l'association.</Typography>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="left">Taille</TableCell>
              <TableCell />

            </TableRow>
          </TableHead>
          <TableBody>
            {paths.map((path) => (
              <FileRow key={path} path={path} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
