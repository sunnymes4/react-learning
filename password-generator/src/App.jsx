import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const generatePass = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // default string with all alphabets to generate password

    if(numberAllowed) str += '0123456789'; // appending all the numbers if numberAllowed is true

    if(charAllowed) str += "[$&+=?@#|-^*()%!]"; // appending all the special chars if charAllowed is true

    for(let i = 1; i< length; i++) {
      let char = Math.floor(Math.random()* str.length+1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // useRef hook for getting refernce of element to make modification to the value
  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
      passwordRef.current?.select(); // this will show the selection of text copied in the text box
      window.navigator.clipboard.writeText(password) // this will copy the text to clipboard
    }, [password])
  


  // Run generatePass method every time there is any change in length/numberAllowed/CharAllowed/generatePass
  // using useEffect which will handle onload scenerio as well
  useEffect(() => {
    generatePass();
  }, [length, numberAllowed, charAllowed, generatePass])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg py-3 my-8 px-4 bg-gray-900 text-white h-fit border-slate-800 border-2'>
        <h1 className='text-center text-4xl text-white'>Password Generator</h1>
        <div className='flex shadow rounded-md overflow-hidden my-4'>
          <input 
            type="text"
            placeholder='password'
            value={password}
            readOnly
            ref={passwordRef}
            className='outline-none w-full py-1 px-3 text-orange-600'/>
          <button
            className='bg-orange-500 outline-none text-white px-3 py-0.5 shrink-0 active:bg-orange-700 hover:bg-orange-600'
            onClick={() => copyPassword()}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2 flex-wrap text-orange-500 my-4'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"/>
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}/>
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}/>
            <label>Special Characters</label>
          </div>
        </div>

        <div className='flex text-sm gap-x-2 flex-wrap '>
          <div className='flex items-center gap-x-1'>
            <h2>Paste the password here</h2>
            <textarea name="pastePassword" id="" cols="40" rows="2" className='outline-none rounded text-1xl text-black'></textarea>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default App
