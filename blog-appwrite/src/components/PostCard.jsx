import React from 'react'
import { Link } from 'react-router-dom'
import blogService from '../appwrite/blogConfig'
import Button from './Button'
import parse from 'html-react-parser'

function PostCard({
    $id,
    featuredImage,
    title,
    content
}) {
    const imgPreview = blogService.getFilePreview(featuredImage)
    return (
        <div className=' bg-gray-100 rounded-lg p-4 w-72 min-h-96'>
            <div className='w-full justify-center mb-4'>
                <img src={imgPreview} alt={title} className='rounded-lg w-full'/>
            </div>
            <h2 className='text-lg font-bold'>{title}</h2>
            <p className='text-ellipsis'>{parse(content)}</p>
            <Link to={`/post/${$id}`}><Button>Read More...</Button></Link>
        </div>
    )
}

export default PostCard
