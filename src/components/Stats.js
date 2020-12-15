import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Typography, makeStyles, Card, CardContent,  Container, AppBar, Toolbar, IconButton, fade, Grid } from "@material-ui/core";



export default function Stats() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("No player selected")
  const [playerStats, setPlayerStats] = useState([]);
  const [playerId, setPlayerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const useStyles = makeStyles((theme) => ({
    container: {
      height: "100vh",
      marginTop: "100px",
      width: "400px",
      backgroundColor: theme.palette.primary
    },
    root: {
      minWidth: 500,

    },
    title: {
      fontSize: 20,
    },
    appbar: {
      backgroundColor: "black"
    },
    search: {
      backgroundColor: fade(theme.palette.common.white, 0.5),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.8),
      },
      width: "50%",
      marginLeft: theme.spacing(10)
    }

  }));

  const classes = useStyles();


  //get array of players that can be filtered by name
  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchTerm}`)
      .then(res => {
        setPlayers(res.data.data)

      })
      .catch(err => {
        console.log(err)
      })
  }, [searchTerm]);
  //get array of players that can be filtered by name
  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`)
      .then(res => {
        setPlayerStats(res.data.data)

      })
      .catch(err => {
        console.log(err)
      })
  }, [playerId]);



  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  const handleSelect = event => {
    console.log(players)
    setPlayerId(players.id)
  };


  return (
    <>

      <AppBar classes={{ root: classes.appbar }} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            NBA Player Stat Finder
    </Typography>
          <Autocomplete
            classes={{ root: classes.search }}
            options={players}
            onChange={handleSearch}
            onClick={handleSelect}
            noOptionsText	
            getOptionLabel={(player) => `${player.first_name} ${player.last_name}`}
            getOptionSelected={(player) => {
            setPlayerId(player.id) 
            setPlayerName(`${player.first_name} ${player.last_name}`)
            }}
            renderInput={(params) => <TextField variant="outlined" {...params} type="text" placeholder="Enter Player Name Here Ex. Lebron James" value={searchTerm} onChange={handleSearch} />}
          />
        </Toolbar>
      </AppBar>


      <Container classes={{ root: classes.container }}>
        <Grid container justify="center" alignContent="center">
          <Grid item>

            <Card classes={{ root: classes.root }}>
              <CardContent>
                <Typography align="center" classes={{ root: classes.title }}>{playerName}</Typography>
                {
                  playerStats.map(stats => (
                    <>
                      <Typography>Points: {stats.pts}</Typography>
                      <Typography>Rebounds: {stats.reb}</Typography>
                      <Typography>Assists: {stats.ast}</Typography>
                      <Typography>Blocks: {stats.blk}</Typography>
                      <Typography>Steals: {stats.stl}</Typography>
                      <Typography>Field Goal %: {stats.fg_pct}</Typography>
                      <Typography>3PT %: {stats.fg3_pct}</Typography>
                      <Typography>Free throw %: {stats.ft_pct}</Typography>
                    </>

                  ))
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

