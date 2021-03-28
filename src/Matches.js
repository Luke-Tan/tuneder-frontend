import React, { useState, useMemo, useEffect } from 'react'
import './App.css'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MatchCard from './MatchCard'
import axios from 'axios'

function Matches({ user }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.post('http://tuneder.herokuapp.com/matches', {
      swiper: user
    }).then(function (response) {
      const resp = response.data
      const matches = []
      resp.forEach(match => {
        matches.push(match)
      });
      console.log(matches);
      setMatches(matches);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className="matches-page">
      <Grid container spacing={3}>
        {matches.map(match =>
          <Grid item xs={6}>
            <MatchCard {...match} />
          </Grid>
        )}
        <Grid item xs={6}>
          <MatchCard facebook='google.com' instagram='http://instagram.com' name='Hello World!' />
        </Grid>
        <Grid item xs={6}>
          <MatchCard />
        </Grid>
      </Grid>
    </div>
  )
}

export default Matches