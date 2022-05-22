import {useSelector } from 'react-redux';
import SignIn from './components/signin-signup/SignIn.component'
import Landing from './pages/landing.page';
import {Routes,Route,BrowserRouter, Navigate} from 'react-router-dom';
import Navbar from './components/navbar/NavBar.component';
// import Dashboard from './pages/dashboard.page';
import SignUp from './components/signin-signup/SignUp.component';
import { lazy,Suspense } from 'react';

const Dashboard = lazy(()=> import('./pages/dashboard.page'))



const App = () => {
  const isAuthenticated = useSelector(state =>state.user.isAuthenticated)
  

 
  return (
    <div className='bg-neutral-900'>
        <BrowserRouter >
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>
              <Route path='/' element={<> <Navbar/> <Landing/></>}/>  
              <Route path='/signin' element={<> <Navbar/> <SignIn /></>}/>
              <Route path='/signup' element={<> <Navbar/> <SignUp/></>}/>
                {isAuthenticated && (<Route path='/dashboard' element={<Dashboard/>}/>)}
                <Route path='*' element={<Navigate to={!isAuthenticated ? '/' :'/dashboard'}/>}/>
            </Routes>
        </Suspense>
        </BrowserRouter>
    </div>
    
    
  );
}

export default App;
