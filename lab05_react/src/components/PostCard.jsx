import React, { useState, useEffect } from 'react'

export default function PostCard() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const postElements = data.map(post => (
                    <div className='card mt-2' key={post.id}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
                        </div>
                    </div>
                ));
                setPosts(postElements);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <> {posts} </>
    )
}
