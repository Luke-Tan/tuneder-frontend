import React, { useState, useMemo, useEffect } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'

import Spotify from 'spotify-web-api-js'
import axios from 'axios'
import request from 'request'


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

function Matches () {
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
        spotifyApi.getPlaylist('4Mcffg5oDmz5cyd20xDkKr')
          .then(function(data) {
            const { images, name, tracks } = data
            console.log(tracks)
            const coverImg = images[0].url
            let playlists = [{
              name,
              url: coverImg,
              tracks
            },
            {
              name: 'hasdf',
              url: coverImg
            },
            {
              name: 'asfqwef',
              url: coverImg
            },
            {
              name: 'afwefqwefqwef',
              url: coverImg
            }]
            setPlaylists(playlists)
            charactersState = playlists
          }, function(err) {
            console.error(err);
          });
      }
    });
  }, [])
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    console.log(direction);
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
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

  return (
    <div className="matches-page">
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
            onSwipe={(dir) => swiped(dir, character.name)} 
            onCardLeftScreen={() => outOfFrame(character.name)}>
            <div className='card'>
              <div
                style={{
                  'backgroundImage': 'url(' + character.url + ')',
                  'width': '100%',
                  'height': '30%',
                  'backgroundSize': 'cover',
                  'backgroundPosition': '0 -30px'
                }}
                className='card-image'
              >
              </div>
              <iframe 
                src="http://open.spotify.com/embed/playlist/4Mcffg5oDmz5cyd20xDkKr" 
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