
import { useState,useCallback, useEffect, useRef } from 'react'
function App() {

  const [length, setLegth] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

    const passwordRef =useRef(null)
    const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!`~+-()*{}[]<>/|@#$%^&"

    for (let i = 1;  i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)   
      pass += str.charAt(char)
    }

    setPassword(pass)

    }, [length, numberAllowed, charAllowed, setPassword]) 
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(() => {
   passwordGenerator()
 },[length,numberAllowed,charAllowed,passwordGenerator])

  
  return (
    <>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4   text-black col-12 bg-gray-700  my-52">
        <h1 className="text-green-500 text-center my-3 text-lg">Password Generator</h1>
        <div className="flex  shadow rounded-lg overflow-hidden md-4 ">
        
          <input type="text" value={password} className=' font-semibold outline-none w-full py-1 px-3 text-green-600    ' placeholder='password' readOnly ref={passwordRef} />

          <button onClick={copyPasswordToClipboard} className=' outline-none bg-green-700 px-3 py-0.5  shrink-0'>Copy</button>
          



        </div>
        

        <div className="flex text-sm gap-x-2 my-2  text-white font-black">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={100} value={length}
              className=' cursor-pointer'
              onChange={(e)=>{setLegth(e.target.value)}}
            />
            <label>Length:{ length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberAllowed'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
                
              }}
            
            />
            <label htmlFor='numberInput'>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed}
              id='characterInput' onChange={() => {
                setCharAllowed((prev) => !prev);
             }}
            
            />
            <label htmlFor="chracterInput">Chracter</label>
          </div>
            



        </div>
      
      
      
      </div>      
    
    
    
    </>




  )
}



export default App









