import {useEffect, useState} from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [data, setData] = useState([])

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
  Axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(res => {
    console.log(res.data)
    setData(res.data)
  }).catch(err => console.log(err))   
  }, [])

  const postData = (e) => {
    e.preventDefault();
    Axios.post('https://jsonplaceholder.typicode.com/posts',{
      title, body
    }).then(res => console.log('Posting data',res)).catch(err => console.log(err)) 
  }

  const postDelete = (id, e) => {
    e.preventDefault();
    Axios.delete('https://jsonplaceholder.typicode.com/posts/${id}').
    then(res => console.log('Deleted data',res)).catch(err => console.log(err)) 
  }

  const array = data.map((data, index) => {
      return (
        <tr>
          <td style={{border: 'solid black'}}>{data.id}</td>
          <td style={{border: 'solid black'}}>{data.title}</td>
          <td style={{border: 'solid black'}}>{data.body}</td>
          <td style={{border: 'solid black'}}><button onClick={(e) => postDelete(data.id, e)}>Delete</button></td>
        </tr>
      )
  })
  
  return (
    <div className="App">
      <h1>Assignment 5: axios with react js</h1>
      <form>
        
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <hr/>
        <label>Body</label>
        <input type="body" value={body} onChange={(e) => setBody(e.target.value)}/>
        <hr/>
        <button onClick={postData}>Post</button>

      </form>
      <table>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
        {array}

      </table>
    </div>
  );
}

export default App;
