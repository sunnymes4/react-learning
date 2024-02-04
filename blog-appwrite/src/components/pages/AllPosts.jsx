import React, { useEffect, useState } from 'react'
import PostCard, { Container } from '../index'
import blogService from '../../appwrite/blogConfig'

function AllPosts() {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        blogService.getAllPosts().then(res => {
            if(res) {
                setPosts(res.documents)
            } 
        })
    }, [])

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts && posts.map(post => (
                    <div key={post.$id} className='bg-gray-300 rounded-md border-gray-500'>
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
