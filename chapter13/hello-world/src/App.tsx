import React, {useState} from 'react';

interface State { 
  userName: string;
  imageUrl: string;
}

const App: React.FC = () => {

  const [state, setState] = useState<State>({
    userName: 'John',
    imageUrl: 'https://picsum.photos/600/150'
  });  

  const myStyles = {margin: 40};

  return (
    <div style ={myStyles}>
      <h1>{state.userName}</h1> 
      <img src={state.imageUrl} alt=""/> 
    </div>
  );
}

export default App;
