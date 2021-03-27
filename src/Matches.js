import React, { useState, useMemo, useEffect } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'

import Spotify from 'spotify-web-api-js'
import axios from 'axios'
import request from 'request'
import { Button } from 'antd'
import firebase from 'firebase'


const alreadyRemoved = []
let charactersState = []
const spotifyApi = new Spotify();
const client_id = 'ac5b377896344935a049b433bef89eed'
const client_secret = '021cfacd857d4f709b3b6f0a6e5a96be'

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

function Matches ({user}) {
  const [playlists, setPlaylists] = useState([])
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(10).fill(0).map(i => React.createRef()), [])

  useEffect(()=> {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        spotifyApi.setAccessToken(token)
        // Get list of playlist Ids
        axios.post('http://tuneder.herokuapp.com/cards', {
              swiper: user
          })
          .then(async function (response) {
            const cards = response.data
            console.log(cards)
            const playlists = []
            //'https://open.spotify.com/playlist/6YFWvXYAz4hGF2vaTDqsX1?si=XlXdDxE5RLG4tSxzJQbPYA'

            for(let { id, playlist: playlistUrl } of cards) {
              const parts = playlistUrl.split('/')
              const urlId = parts[parts.length - 1]
              const data = await spotifyApi.getPlaylist(urlId);
              const { images, name, tracks } = data

              const coverImg = images[0].url
              let playlist = {
                name,
                img: coverImg,
                url: playlistUrl,
                urlId,
                tracks,
                userId: id
              }
              playlists.push(playlist)
            }
            setPlaylists(playlists)
            console.log(playlists)
            charactersState = playlists
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }, [])

  const swiped = (direction, swipee, nameToDelete) => {
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)

    if (direction == "left") {
      console.log("left");
      return;
    }
    console.log(swipee)
    axios.post('http://tuneder.herokuapp.com/swiperight', {
        swiper: user,
        swipee: swipee
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setPlaylists(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = playlists.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = playlists.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  const logout = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="matches-page">
      <Button onClick={logout}>Sign out</Button>
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <div className='cardContainer'>
        {playlists.map((character, index) =>
          <TinderCard 
            ref={childRefs[index]} 
            className='swipe' 
            key={character.name} 
            preventSwipe={['down', 'up']}
            onSwipe={(dir) => swiped(dir, character.userId)} 
            onCardLeftScreen={() => outOfFrame(character.name)}>
            <div className='card'>
              <div
                style={{
                  'backgroundImage': 'url(' + character.img + ')',
                  'width': '100%',
                  'height': '30%',
                  'backgroundSize': 'cover',
                  'backgroundPosition': '0 -30px'
                }}
                className='card-image'
              >
              </div>
              <iframe 
                src={`http://open.spotify.com/embed/playlist/${character.urlId}`}
                width="360" height="70%" 
                style={{borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}
                frameBorder="0" 
                allowtransparency="true" 
                allow="encrypted -media"
              >

              </iframe>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        <button onClick={() => swipe('left')}>Skip</button>
        <button onClick={() => swipe('right')}>I like this!</button>
      </div>
    </div>
  )
}

export default Matches
