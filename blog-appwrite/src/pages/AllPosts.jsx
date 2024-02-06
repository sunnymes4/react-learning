import { useEffect, useState } from 'react'
import blogService from '../appwrite/blogConfig'
import Container from '../components/container/container'
import PostCard from '../components/PostCard'
import logo from '../assets/Spinner-3.gif'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {
        blogService.getAllPosts().then(res => {
            if(res) {
                setPosts(res.documents)
                setLoading(false)
            } 
        })
    }, [])

  return loading ? 
    <div className='flex justify-center items-center'>
        <img src={logo} alt='Loading...'/>
        <h2 className='text-green-600 text-xl ml-2 font-bold'>Loading...</h2>
    </div> : (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap gap-2'>
                {posts && posts.map(post => (
                    <div key={post.$id} className='bg-gray-100 rounded-md  border border-gray-300'>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
