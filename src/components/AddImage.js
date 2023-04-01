
// import { useState } from 'react'
import axios from 'axios'
// const cloudinary = require('cloudinary').v2
// import { Card, Alert, Form } from 'react-bootstrap'

// cloudinary.config({
//   cloud_name: "dsvzwkwrf",
//   api_key: "793323712738693",
//   api_secret: "3vf0-AY1dNHAn21kusFRlTR490M"
// })

const AddImage = () => {

  // const [error, setError] = useState()
  // const [image, setImage] = useState('placeholder')
  const handleSubmit = (event) => {
    event.preventDefault()
    // if (image){
    // setImage('newest')
    console.log('event.target.myImageUrl', event.target.myImageUrl.value)
    let img = event.target.myImageUrl.value
    let imag = document.createElement('img')
    imag.src = event.target.myImageUrl.value
    console.log(imag)
    document.querySelector('#pic').insertAdjacentElement('afterbegin', imag)
    axios.post('/api/images', { image: img }).then((image) => console.log('happy', image))
    // axios.get('/api/images')
    // .then((pics) => {
    // console.log('pics', pics)
    // pics.data.forEach(pic => {
    //   if(pic.image) {
    //     let img = document.createElement('img')
    //     img.src = pic.image
    //     console.log(img)
    //     document.querySelector('#pic').insertAdjacentElement('afterbegin', img)
    //   }
    // })
    // })
  }

  // let image
  // async function handleSubmit(e) {
  //   e.preventDefault()
  //   console.log(e.target.img)
  // }
  //   // try {
  //     const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})
  //     res.then((data) => {
  //       console.log(data);
  //       console.log(data.secure_url);
  //     }).catch((err) => {
  //       console.log(err);
  //     });

  //     const url = cloudinary.url("olympic_flag", {
  //       width: 100,
  //       height: 150,
  //       Crop: 'fill'
  //     })

  //     // The output url
  //     console.log(url);
  // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
  // }
  //     let imageUrl = ''
  //     if (image) {
  //       console.log('test')
  //       const formData = new FormData()
  //       formData.append('file', e.target.img)
  //       formData.append('upload_preset', 'randomer')
  //       const config = {
  //         headers: {
  //           'Access-Control-Allow-Origin' : '*'
  //         }
  //       }
  //       const dataRes = axios.post(
  //         'https://api.cloudinary.com/v1_1/dsvzwkwrf',
  //         formData, config
  //       ).then((res) => console.log('imageUrl1', res))
  //       imageUrl = dataRes.data.url
  //     }
  //     console.log('imageUrl', imageUrl)
  //     const submitPost = {
  //       image: imageUrl,
  //     }
  //     // console.log(selectedCommunity)
  //     await axios.post('http://localhost:3003/api/images', submitPost)
  //   } catch (err) {
  //     err.msg
  //   }
  // }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <input type="file" name="myImage" accept="image/*" /> */}
        <input type="text" name="myImageUrl" />
        <input type="submit" value="Upload Photo" />
      </form>
    </div>
  )

}

export default AddImage