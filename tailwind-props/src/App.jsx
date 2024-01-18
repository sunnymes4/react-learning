import Card  from './components/Card.jsx'
import './App.css'

function App() {
  const imgArr = [
    'https://images.pexels.com/photos/17774309/pexels-photo-17774309/free-photo-of-smiling-man-in-jacket-and-with-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/19583197/pexels-photo-19583197/free-photo-of-photographer-with-camera-on-city-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/16352763/pexels-photo-16352763/free-photo-of-tattooed-social-media-expert-working-chatgpt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ]

  return (
    <>
      <h3 className='bg-blue-300 p-5 mb-10 text-2xl rounded-lg'>Tailwind CSS and React props</h3>
      <div className='flex'>
        <Card name="Sunny" btnText="Click Me" imgUrl={imgArr[0]}/>
        <Card name="Bhupinder" imgUrl={imgArr[1]}/>
        <Card name="Manhas" imgUrl={imgArr[2]}/>
      </div>
    </>
  )
}

export default App
