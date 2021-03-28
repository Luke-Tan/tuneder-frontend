import React, { useState, useMemo, useEffect } from 'react'
import './App.css'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

function MatchCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton href={props.facebook} aria-label="Facebook">
          <FacebookIcon />
        </IconButton>
        <IconButton href={props.instagram} aria-label="Facebook">
          <InstagramIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default MatchCard