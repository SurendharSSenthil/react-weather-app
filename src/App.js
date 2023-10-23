import React, { useEffect, useState } from 'react';
import './App.css';

const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5/';
const REACT_APP_API_KEY = 'a82a129e921c620cb24e5dbb68b7c603';

function App() {
  const [search, setSearch] = useState('Coimbatore');
  const [temp, setTemp] = useState('');
  const [desc,setDesc] = useState('');
  let Weather = 0;
  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      fetch(`${REACT_APP_API_URL}weather?q=${search}&appid=${REACT_APP_API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          Weather = data.weather[0].main;
          let x = data.main.temp;
          setTemp(x.toFixed(1));
          setDesc(data.weather[0].main);
        })
        .catch(err => {
          console.log(err);
          setTemp("City Not Found");
        });
    }
  }

  useEffect(() => {
    handleSubmit({key : 'Enter'}); 
  });

  return (
    <div className={(typeof Weather != 'undefined') ? ((temp > 20) ? 'app-warm' : 'app-cold') : 'app-cold'}>
      <div className='Body'>
      <nav>
        <input value={search} type='text' onChange={(e) => setSearch(e.target.value)} onKeyPress={handleSubmit} />
      </nav>
      <div className='info-container'> 
        <div className='city-info'>{search}</div>
        <div className='Temp'>{`${temp} C`}</div>
      </div>
      <div className='Desc'>{desc}</div> 
      <div className='footer'>&copy;Surendhar Senthil</div>
      </div>
    </div>
  );
}

export default App;
