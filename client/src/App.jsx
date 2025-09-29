// client/src/App.jsx
import { useState } from 'react'

function App() {
  const [msg, setMsg] = useState('')

  async function testApi() {
    try {
      // Using full URL so no proxy needed; server must be running on port 5000
      const res = await fetch('http://localhost:5000/api/test')
      const data = await res.json()
      setMsg(data.message)
    } catch (err) {
      setMsg('Error: ' + err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow">
        <h1 className="text-xl mb-4">Hi Dunith 👋</h1>
        <button
          onClick={testApi}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <p className="mt-4">{msg}</p>
      </div>
    </div>
  )
}

export default App
