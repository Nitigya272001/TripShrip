import React from 'react';
import BlogCard from './BlogCard';

const BlogContents = [{title:"",linkTo:""},{title:"",linkTo:""},{title:"",linkTo:""}]
const BlogCards = BlogContents.map((BlogContent)=>{
    return <BlogCard title={BlogContent.title} linkTo={BlogContent.linkTo}/>
})

function BlogsList() {
  return (
    <>
      <h4> Trending Blogs </h4>
      {BlogCards}
    </>
  )
}

export default BlogsList