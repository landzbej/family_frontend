import { useState } from 'react'
// import { Form } from 'react-bootstrap'
// import { File } from 'react-bootstrap'


const BlogForm = ({ addBlog }) => {
  //ADDED BELOW
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  //ADDED
  // const [newImage, setNewImage] = useState('')
  //ABOVE

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }
  //ADDED
  // const handleImageChange = (event) => {
  //   setNewImage(event.target.value)
  // }
  //ABOVE
  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: 0,
      comments: ['initial comment']
    })
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }
  // const [error, setError] = useState();

  // const [image, setImage] = useState('monsaraz.jpg')

  return(
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={createBlog}>
        <p>Title</p>
        <input
          value={newTitle}
          id="title"
          placeholder="title"
          onChange={handleTitleChange}
        />
        <p>Author</p>
        <input
          value={newAuthor}
          id="author"
          placeholder="author"
          onChange={handleAuthorChange}
        />
        <p>URL</p>
        <input
          value={newURL}
          id="url"
          placeholder="url"
          onChange={handleURLChange}
        />
        {/* ADDED */}
        {/* <Form.Group>
          <Form.Control
            type="file"
            className="position-relative mt-2"
            name="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            id="validationFormik107"
            feedbackTooltip
          />
        </Form.Group> */}
        {/* ABOVE */}
        <button type="submit" id="blogFormButton">save</button>
      </form>
    </div>
  )
}

export default BlogForm