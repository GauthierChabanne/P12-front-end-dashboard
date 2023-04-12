import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function Routing (){
  return(
    <Routes>
      <Route path="/:userId" element={<Home />} />
    </Routes>
  )
}

export default Routing
