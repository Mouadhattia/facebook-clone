import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './Login/Login';
import Resgister from './Register/Register';
import {  firebaseApp } from './firebase';
import HomeHeader from './Home/HomeHeader';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PrivateRoute from './PrivateRoute'
import SidebarLeft from './Home/SidebarLeft';
import SidebarRight from './Home/SidebarRight';
import Post from './Home/Posts';
import Profile from './Home/Profile';


function App() {
  const [ping, setPing] = useState(false);
  const [user, setUser] = useState(false);
  const auth = getAuth(firebaseApp);
 
 


  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
     if(authUser){
       setUser(authUser)  
      
     }
     else{
      setUser(false)
    }
    console.log(user)
    });
  
  }, [ping])
  
  return (
    <div className="App">
    <Router>
    
      <Switch>
      <Route path='/login'>
        <Login setPing ={setPing} ping={ping} />
        </Route>
        <Route path='/login'>
        <Login setPing ={setPing} ping={ping} />
        </Route>
        <Route path='/register'>
        <Resgister setPing ={setPing} ping={ping}/>
        </Route>
        <Route path="/:username/:uid">
           <HomeHeader  user={user}  />
              <Profile user={user} />
            </Route>
        <PrivateRoute exact path="/" user={user} >
          <HomeHeader  user={user} ping={ping} setPing ={setPing} selected />
           <div className="app__page">
             <SidebarLeft user={user}/>
             <div className="app__posts">
                  <Post user={user} />
                </div>
             <SidebarRight user={user}/>
           </div>
        </PrivateRoute>
      </Switch>
      
    </Router>
    </div>
  );
}

export default App;
