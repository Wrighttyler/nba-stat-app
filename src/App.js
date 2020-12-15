import { Box, makeStyles } from '@material-ui/core';
import './App.css';
import Stats from './components/Stats';

function App() {
  
  const useStyles = makeStyles((theme) => ({
    container: {
      height: "100vh",
      marginTop: "100px",
      
      backgroundColor: theme.palette.primary
    },
    root: {
      widhth:"100vw",
      padding:"0",
      margin:"0",
      backgroundColor:theme.palette.grey[700]
    },



  }));

  const classes = useStyles();
  return (
    <Box classes={{root:classes.root}}>
   <Stats/>
    </Box>
  );
}

export default App;
