import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import StudentCard from './components/StudentCard'
import FormCard from './components/FormCard';
import PostCard from './components/PostCard';
import StudentList from './components/StudentList';

function App() {

  return (
    <div className='container'>
      <StudentCard name="sakda" major="Geography" />
      <StudentCard name="somchai" major="Geography" />
      <FormCard />
      <PostCard />
      <StudentList />
    </div>
  )
}

export default App


