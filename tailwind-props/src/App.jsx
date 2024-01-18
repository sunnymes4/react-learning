import Card  from './components/Card.jsx'
import BgChanger from './components/BgChanger.jsx'
import './App.css'
import { useState } from 'react'

function App() {

  const [bgColor, setBgColor] = useState('red');

  const imgArr = [
    'https://images.pexels.com/photos/17774309/pexels-photo-17774309/free-photo-of-smiling-man-in-jacket-and-with-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/19583197/pexels-photo-19583197/free-photo-of-photographer-with-camera-on-city-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/16352763/pexels-photo-16352763/free-photo-of-tattooed-social-media-expert-working-chatgpt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ]

  // static object created for list of colors, you can add or delete color as you want in this object
  // and that will work accordingly!
  const btnColor = [
    {
      id: crypto.randomUUID(),
      name: 'Red',
      color: 'red'
    },
    {
      id: crypto.randomUUID(),
      name: 'Green',
      color: 'green'
    },
    {
      id: crypto.randomUUID(),
      name: 'Blue',
      color: 'blue'
    },
    {
      id: crypto.randomUUID(),
      name: 'Orange',
      color: 'orange'
    },
    {
      id: crypto.randomUUID(),
      name: 'Pink',
      color: 'pink'
    },
    {
      id: crypto.randomUUID(),
      name: 'Yellow',
      color: 'yellow'
    }
  ]

  // method to set the updated background color
  const bgColorChange = (currentVal) => {
    setBgColor(currentVal);
  }

  return (
    <div
      className='w-full h-screen duration-200 p-10'
      style={{backgroundColor: bgColor}}>

      <h3 className='bg-gray-200 p-5 mb-10 text-2xl rounded-lg text-center'>Tailwind CSS, React props and Background change App</h3>
      
      <div className='flex'>
        <Card name="Sunny" btnText="Click Me" imgUrl={imgArr[0]}/>
        <Card name="Bhupinder" imgUrl={imgArr[1]}/>

        <Card name="Manhas" imgUrl={imgArr[2]}/>
        <Card name="Bhupinder" imgUrl={imgArr[1]}/>
      </div>

       {/* background changer component injection with list of colors and method to change color */}
      <BgChanger btnList={btnColor} bgChange={bgColorChange}/>
    </div>
  )
}

export default App
