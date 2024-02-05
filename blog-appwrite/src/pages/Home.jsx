import { useEffect, useState } from 'react'
import blogService from '../appwrite/blogConfig'
import Container from '../components/container/container'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const selector = useSelector((state) => state.auth.userData)

    useEffect(() => {
        console.log(selector)
        blogService.getAllPosts().then((posts) => {
            if(posts) {
                setPosts(posts)
            }
        })
    }, [])


    return posts.length > 0 ? (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    { posts?.map((post) => {
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    })}
                </div>
            </Container>
        </div>
    ) : 
    (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home
