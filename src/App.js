import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Sign from './components/Sign';
import List from './components/List';
import Add from './components/Add';
import Edit from './components/Edit';
import PlaySet from './components/PlaySet';
import SpellFill from './components/SpellFill';
import Spell from './components/Spell';
import Mean from './components/Mean';
import SpellInsert from './components/SpellInsert';

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
          <Route exact path='/playSet' element={<PlaySet></PlaySet>}></Route>
          <Route exact path='/spellFill' element={<SpellFill></SpellFill>}></Route>
          <Route exact path='/spell' element={<Spell></Spell>}></Route>
          <Route exact path='/mean' element={<Mean></Mean>}></Route>
          <Route exact path='/spellInsert' element={<SpellInsert></SpellInsert>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
