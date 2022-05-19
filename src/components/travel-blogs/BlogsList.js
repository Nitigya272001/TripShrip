import React, {useEffect, useState} from 'react';
import BlogCard from './BlogCard';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../Firebase/Fire';
import { fontFamily } from '@mui/system';
import {Grid} from '@mui/material';

function BlogsList() {
  const [BlogCards,setBlogCards] = useState(null);

  const ff = async() => {
    let guidesSnapshot = await getDocs(collection(db, "travel-blogs"));
    let BlogContents = (guidesSnapshot.docs.map(doc => doc.data()));

    setBlogCards(BlogContents.map((BlogContent)=>{
      return <BlogCard title={BlogContent.title} linkTo={""} image={BlogContent.images} description={BlogContent.blogtext}/>
    }))
  }

  useEffect(() => {
    ff();
  }, [])

  return (
    <>
      <h1> Trending Blogs </h1>
      {BlogCards}
    </>
  )
}

export default BlogsList