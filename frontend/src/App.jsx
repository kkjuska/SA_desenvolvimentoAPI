import { useState } from 'react'
import './App.css'
import Cardget from './components/cardget'
import CardGetById from './components/cardGetById'
import CardPost from './components/cardpost'
import CardPut from './components/cardput'
import CardDelete from './components/cardDelete'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center bg-[#000000] gap-6 pt-10">
        <Cardget></Cardget>
        <CardGetById></CardGetById>
        <CardPost></CardPost>
        <CardPut></CardPut>
        <CardDelete></CardDelete>
      </div>
    </>
  )
}

export default App
