import { useState, useCallback,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str +="0123456789"
    if(charAllowed) str +="~!@#$%&()*"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      setPassword(pass)
    }
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordClip = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto  shadow-md rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type='text' ref={passwordRef} value={password} className='w-full outline-none py-1 px-3' placeholder='password'
            readOnly />
          <button onClick={copyPasswordClip} className='outline-none px-1 py-0.5 bg-blue-700 text-white shrink-0'>Copy</button>
        </div>

        <div className='flex gap-x-2 text-sm'>
          <div className='flex items-center gap-x-1-3'>
            <input type='range'
              min={8}
              max={100}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
              className='cursor-pointer' />
            <label>Length: {length}</label>

          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={()=>{
                setNumberAllowed((prev)=>!prev)
              }} />
              <label>Number</label>

          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={charAllowed}
              id='numberInput'
              onChange={()=>{
                setCharAllowed((prev)=>!prev)
              }} />
              <label>Character</label>

          </div>

        </div>

      </div>
    </>
  )
}

export default App
