import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import blogService from '../appwrite/blogConfig'
import {Container, Button} from '../components/index'
import parse from 'html-react-parser'

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const author = post && userData ? userData.$id === post.$id : false;

    useEffect(() => {
        blogService.getPost(slug).then(post => {
            if(post) {
                setPost(post)
            } else {
                navigate('/')
            }
        })
    }, [slug, navigate])

    const deletePost = (id) => {
        blogService.deleteFile(id).then(status => {
            if(status) {
                blogService.deleteFile(post.featureImage)
                navigate('/')
            }
        })
    }

  return post ? (
    <div className='py-8'>
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img src={blogService.getFilePreview(post.featureImage)} alt={post.title} className='rounded-xl'/>
                {author && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>

                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
            </div>
        </Container>
    </div>
  ) : null;
}

export default Post
