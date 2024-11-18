import { useState } from 'react'
import './App.css'
import { Header } from './component/Header'
import { ReminderList, ReminderT } from './component/ReminderList'
import SetReminderForm from './component/SetReminderForm'

function App() {
  const [showList, setShowList] = useState(false)
  const [foundItem, setFoundItem] = useState<null | ReminderT>(null)
  const onBtnClick = ()=> {
    setShowList(!showList);

  }

  const handleFoundItem = (item: ReminderT)=> {
    setFoundItem(item);
    setShowList(false);
  }

  return (
    <>
    <main className='w-[380px] max-h-[650px] m-auto'>    
    <Header onListBtnClickCallBack={onBtnClick} showList={showList}/>
   {showList ? <ReminderList handleFoundItemcallBack={handleFoundItem} /> : <SetReminderForm foundItem={foundItem} />}
    </main>
    </>
  )
}

export default App
