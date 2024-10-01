
 
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import { Suspense, lazy } from 'react'
 
const Appbar= lazy(()=> import('./components/appbar'));
const SignUp= lazy(()=> import('./components/signUp'));
const SignIn= lazy(()=> import('./components/signIn'));
const About= lazy(()=> import('./components/About'));
const CreateTodo= lazy(()=> import('./components/createTodo'));
 

function App() {
    
 
  return (  
    <> 
        <Router> 
        <div className='w-screen h-screen overflow-scroll bg-[#333333]'> 
               
            <div  > 
            <Routes>
              <Route path='/' element={ <Suspense fallback={<div>Loading...</div>}><Appbar/></Suspense>}/>
              <Route path='/signup' element={<Suspense fallback={<div>Loading...</div>}><SignUp/> </Suspense>}/>
              <Route path='/about' element={<Suspense fallback={<div>Loading...</div>}><About/> </Suspense>}/>
              <Route path='/login' element={<Suspense fallback={<div>Loading...</div>}><SignIn/> </Suspense>}/>
              <Route path='/home' element={<Suspense fallback={<div>Loading...</div>}><CreateTodo/> </Suspense>}/>
            </Routes>
           </div>
        </div>
           </Router>  
    </>
  )
}

export default App
