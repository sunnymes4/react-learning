import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import blogService from '../appwrite/blogConfig'
import {Container, Button} from '../components/index'
import parse from 'html-react-parser'
import logo from '../assets/Spinner-3.gif'
import {
    WhatsappShareButton,
    LinkedinShareButton,
    WhatsappIcon,
    LinkedinIcon,
} from 'react-share'

function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState('');
    const { slug } = useParams()
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const author = post && userData ? userData.$id === post.userId : false;
    

    useEffect(() => {
        blogService.getPost(slug).then(post => {
            if(post) {
                setPost(post)
                setLoading(false)
                const imgPreview = blogService.getFilePreview(post.featuredImage)
                setImageUrl(imgPreview.href)
            } else {
                navigate('/')
            }
        })
    }, [slug, navigate])

    const deletePost = () => {
        blogService.deletePost(post.$id).then(status => {
            if(status) {
                blogService.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }

  return loading && !post ? 
    <div className='flex justify-center items-center'>
        <img src={logo} alt='Loading...'/>
        <h2 className='text-green-600 text-xl ml-2 font-bold'>Loading...</h2>
    </div> : (
        
    <Container>
        <div className='py-8 flex'>
            <div className='w-1/2 px-2'>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img src={blogService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl w-80'/>
                    <div className='flex justify-center gap-3 ml-4'>
                        <LinkedinShareButton url ={imageUrl}>
                            <LinkedinIcon size={32} round/>
                        </LinkedinShareButton>
                        <WhatsappShareButton url ={imageUrl}>
                            <WhatsappIcon size={32} round/>
                        </WhatsappShareButton>
                    </div>
                </div>
            </div>
            <div className='w-1/2 justify-center mb-4 relative border rounded-xl p-2'>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
                {author && (
                    <div className="mt-5 right-6 top-6">
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
        </div>
    </Container>
  )
}

export default Post
