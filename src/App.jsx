import { useEffect, useState } from 'react'
import { API } from './api'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function ApiForm({ onSubmit, initialValue }) {
  const [urlField, setUrlField] = useState(initialValue)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(urlField)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="apiUrl">Api Url</label>
      <input type="text" name="apiUrl" id="apiUrl"
        value={urlField}
        onChange={e => setUrlField(e.target.value)}
      />
      <button type="submit">Use this Api</button>
    </form>
  )
}

function App() {
  const [lists, setLists] = useState([])
  const [url, setUrl] = useState(BASE_URL)
  useEffect(() => {
    API.baseUrl = url
    if (API.baseUrl) {
      API.getLists().then(lists => {
        setLists(lists)
        console.log(lists)
      })
    }
  }, [url])

  return (
    <div>
      <ApiForm
        initialValue={url}
        onSubmit={setUrl}
      />
      {lists.map(list => (
        <div key={list.id}>
          <h2>{list.name}</h2>
          <ul>
            {list.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default App
