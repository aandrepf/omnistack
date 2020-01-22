import React, { useEffect, useState } from 'react';

import './styles.css'

function DevForm({ onSubmit }) {
    const [github_username, setGithubUserName] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position)  => {
            console.log(position);
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude.toFixed(7));
            setLongitude(longitude.toFixed(7));
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        );
    }, []); // [] = irá executar uma unica vez, ou se houver valores ira executar assim que o valor sofrer alteração

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUserName('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuario do Github</label>
            <input
              name="github_username" 
              id="github_username" 
              value={github_username}
              onChange={e => setGithubUserName(e.target.value)} required />
          </div>
          
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              value={techs}
              onChange={e => setTechs(e.target.value)} required />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number"
                name="latitude"
                id="latitude"
                value={latitude}
                onChange={e => setLatitude(e.target.value)} required />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                value={longitude}
                onChange={e => setLongitude(e.target.value)} required />
            </div>
          </div>
          
          <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;