import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import blogService from '../appwrite/blogConfig'
import {PostForm, Container} from '../components/index'

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug) {
            blogService.getPost(slug).then(res => {
                setPost(res)
            })
        } else {
            navigate('/post')
        }
    }, [slug, navigate])

  return post ? (
    <div>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost
