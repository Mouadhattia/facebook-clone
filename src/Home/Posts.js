import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import ImageUpload from './ImageUpload';
import Post from './Post';
import './Posts.css'

const Posts = ({user}) => {
  
    const [posts, setPosts] = useState([]);
    document.title = 'Facebook';
    useEffect(() => {
      const P= query(collection(db,'posts'),orderBy('timestamp',"desc"))
      onSnapshot(P,snapshot => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
    
  }, []);
  return (
    <div className="posts">
        <ImageUpload/>
        {
        posts.map(({ id, post }) => (
       < Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} noLikes={post.noLikes} postUserId={post.uid} />
                ))
            }
    </div>
  )
}

export default Posts