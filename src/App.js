import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Sign from './components/Sign';
import List from './components/List';
import Add from './components/Add';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login></Login>}></Route>
          <Route exact path='/sign' element={<Sign></Sign>}></Route>
          <Route exact path='/list' element={<List></List>}></Route>
          <Route exact path='/addPage' element={<Add></Add>}></Route>
          <Route exact path='/edit' element={<Edit></Edit>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
