import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import blogService from '../../appwrite/blogConfig'
import Container, { PostCard } from '../index'

function Home() {
    const [posts, setPosts] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        blogService.getAllPosts().then((posts) => {
            if(posts) {
                setPosts(posts)
            }
        })
    }, [])


    if (posts.length === 0) {
        return (
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

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                { posts.map((post) => {
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post}/>
                    </div>
                })}
            </div>
        </Container>
    </div>
  )
}

export default Home
