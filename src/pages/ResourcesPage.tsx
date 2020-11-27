import React, { useContext, useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { FirebaseContext } from '../components/Firebase';
import GetAppIcon from '@material-ui/icons/GetApp';
import { formatBytes } from '../Utils';
import { Breadcrumbs, Container, Link } from '@material-ui/core';
import { storages } from '../constants/firebase';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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

const FolderRow = (props: { path: string, setPath: Function }) => {

  const firebase = useContext(FirebaseContext);
  const { path, setPath } = props;

  const getLastItem = (thePath: string) => thePath.substring(thePath.lastIndexOf('/') + 1);
  // Sync the data with the context
  const [docs_path, setDocs] = useState<string[]>([]);
  const [folders_path, setFolders] = useState<string[]>([]);

  // Sync the data with the context
  useEffect(() => {
    const fetchResources = async () => {
      if (firebase) {
        const resources = await firebase.listResources(path);
        if (resources) {
          const docs_path_arr = resources.items.map(item => item.fullPath);
          const folder_arr = resources.prefixes.map(prefix => prefix.fullPath);

          console.log("RESOURCES ", resources);
          setDocs(docs_path_arr);
          setFolders(folder_arr);
          console.log("FOLDER PATH", folder_arr);

        }
      } else
        console.log("No firebase");
    }
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>

      {folders_path.length > 0 && folders_path.map((path) => (
        <TableRow >
          <TableCell >
            <Link color="primary" onClick={() => setPath(path)} style={{ fontSize: 24 }} >
              <FolderOutlinedIcon color="primary" />
              {"\t" + getLastItem(path)}
            </Link>
          </TableCell>
          <TableCell colSpan={12} align="left">-</TableCell>
        </TableRow>))
      }
      {
        docs_path.length > 0 && docs_path.map((path) => (
          <FileRow key={path} path={path} />
        ))
      }
    </>

  );
}

const BreadCrumbsFolder = (props: { path: string, setPath: Function }) => {
  const { path, setPath } = props;

  const path_split = path.split("/");

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<ArrowForwardIosIcon fontSize="small" />}  >
      {path_split.map((folder_name, index) =>
        <Link color={(path_split.length - 1 === index) ? "primary" : "inherit"}
          onClick={() => setPath(path_split.slice(0, index + 1).join("/"))}>
          {folder_name}
        </Link>
      )
      }
    </Breadcrumbs >);
}

export default function ResourcesPage() {

  const [path, setPath] = useState<string>(storages.resources);

  return (
    <Container>
      <Typography variant="h2" color="primary">Ressources</Typography>
      <Typography variant="body1">Retrouvez ici tous les documents de l'association.</Typography>


      <TableContainer component={Paper}>

        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow  >
              <TableCell colSpan={12}>
                <BreadCrumbsFolder key={path} path={path} setPath={setPath} />
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell >Nom</TableCell>
              <TableCell >Taille</TableCell>
              <TableCell />

            </TableRow>
          </TableHead>
          <TableBody>
            <FolderRow key={path} path={path} setPath={setPath} />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
