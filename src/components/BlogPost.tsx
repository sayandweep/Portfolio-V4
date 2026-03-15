import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase, type Post } from "../lib/supabase"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'


export default function BlogPost() {

  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true)
        else setPost(data)
        setLoading(false)
      })
  }, [slug])




  if (loading) return <div>Loading...</div>
  if (notFound) return <div>Not Found</div>



  return (
      <div className="blogpost-container">
        <h1 className="postTitle">{post!.title}</h1>
            <span className="postDate">
              {new Date(post!.published_at).toLocaleDateString('en-US', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </span>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post!.content}</ReactMarkdown>
      </div>
  )
}