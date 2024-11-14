import { useState } from 'react'
import './App.css'
import { Header } from './component/Header'
import { ReminderList } from './component/ReminderList'
import SetReminderForm from './component/SetReminderForm'

function App() {
  const [showList, setShowList] = useState(false)

  const onBtnClick = ()=> {
    setShowList(!showList)
  }
  return (
    <>
    <main className='w-[380px] max-h-[650px] m-auto'>    
    <Header onListBtnClickCallBack={onBtnClick}/>
    <SetReminderForm/>
   {showList && <ReminderList />}
    </main>
    </>
  )
}

export default App
