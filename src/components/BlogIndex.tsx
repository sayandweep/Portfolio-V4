import { useState } from 'react'
import {supabase, type Post} from '../lib/supabase'
import { useEffect } from 'react'


export default function BlogIndex() {

  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])

  
  useEffect(() => {
    supabase
      .from('posts')
      .select('id, title, slug, excerpt, published_at, tags')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .then(({ data, error }) => {
        console.log('data:', data)
        console.log('error:', error)
        setPosts((data ?? []) as Post[])
        setLoading(false)
      })
  }, [])



  if (loading) return <div>Loading...</div>



  return(
    <div className="sectionWrapper" id='blogs'>
    <h5>Blogs</h5>
      <div className="blogs">
        {posts.map((post) => (
          <a href={`/blog/${post.slug}`}>
              <ul>{post.title}</ul>
          </a>
        ))}
      </div>
    </div>
  )

}