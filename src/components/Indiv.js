import {
  useParams
} from 'react-router-dom'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { deleteOne, likeOne, commentOne } from '../reducers/blogReducer'
import { checkUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import axios from 'axios'


const Indiv = forwardRef((props, refs) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [newContent, setNewContent] = useState('')

  const handleContentChange = (event) => {
    setNewContent(event.target.value)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const id = useParams().id
  const note = props.blogs.find(n => n.id === id)
  console.log('note', note)



  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`remove the blog ${note.title} by ${note.author}?`)) {
        await blogService.erase(note.id)
        dispatch(deleteOne(note.id))
      } else {
        return
      }
    } catch(exception) {
      props.setErrorMessage(exception.message)
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 2000)

    }
  }

  const handleLikes =  async (event) => {
    event.preventDefault()
    dispatch(checkUser())
    await props.updateLikes(note.id, { title: note.title, author: note.author, likes: Number(note.likes) + 1, url: note.url, user: note.user, comments: note.comments })
    dispatch(likeOne(note.id))
  }

  if(!note) {
    return (
      <div>
        your note was deleted
      </div>
    )
  }

  const handleComments =  async (event) => {
    event.preventDefault()
    dispatch(checkUser())
    await props.updateComments(note.id, { title: note.title, author: note.author, likes: note.likes, url: note.url, user: note.user, comments: note.comments.concat([newContent]) })
    console.log('INDIV comp 120 newContent', newContent)
    dispatch(commentOne({ id: note.id, content: newContent }))
  }

  const handleImage = (event) => {
    event.preventDefault()
    console.log('event.target.myImageUrl', event.target.myImageUrl.value)
    let img = event.target.myImageUrl.value
    let imag = document.createElement('img')
    imag.src = event.target.myImageUrl.value
    console.log(imag)
    document.querySelector('#pic').insertAdjacentElement('afterbegin', imag)
    //ADDED NOTEID BELOW
    axios.post('/api/images', { paramId:note.id, image: img }).then((image) => console.log('happy', image))
  }




  if(!note) {
    return (
      <div>
        your note was deleted
      </div>
    )
  }

  return (
    <div style={blogStyle}>

      <div style={hideWhenVisible} className='shortInfo'>

        {note.title} {note.author}

        <button onClick={toggleVisibility} className='viewButton'>view and/or add images</button>

      </div>

      <div style={showWhenVisible} className='longInfo'>

        {note.title} {note.author}

        <button onClick={toggleVisibility}>hide</button>
        {/* ADDED */}
        <br/>
        {/* <AddImage /> */}
        <div>
          <form onSubmit={handleImage}>
            {/* <input type="file" name="myImage" accept="image/*" /> */}
            <input type="text" name="myImageUrl" />
            <input type="submit" value="Upload Photo" />
          </form>
        </div>
        <div id='pic'></div>
        {
          props.imige.map((img, i) => {
            //ADDED BELOW PARAMID
            if(id === img.paramId) {
              return (
                <img key={i} src={img.image}/>
              )
            } else return
          }) || 'image here'
        }
        {/* {note.image || 'image here'} */}
        {/* ABOVE */}
        <br/>
        {props.url}
        <br/>
      likes: <div>{note.likes}</div> <button onClick={handleLikes}>like</button>
        <br/>
        {note.username}
        <br/>
        <button onClick={handleDelete}>delete</button>
        <h4>Comments</h4>
        <ul>
          {note.comments.map((comment, i) =>
            <li key={i}>{comment}</li>
          )}
        </ul>
        <form onSubmit={handleComments}>
          <input
            value={newContent}
            id="note"
            placeholder="note"
            onChange={handleContentChange}
          />
          <button type="submit" id="commentFormButton">add comment</button>
        </form>
      </div>
    </div>
  )
}

)
Indiv.displayName = 'Indiv'

export default Indiv
