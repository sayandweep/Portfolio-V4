import { useEffect, useState } from 'react'
import { motion, cubicBezier } from 'motion/react'
import { Plus, Eye, EyeOff, Trash2, Check } from 'lucide-react'
import { supabase, type Post } from '../lib/supabase'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function AdminBlog() {
  const easing = cubicBezier(0.48, 0.3, 0.18, 1.15)
  const [authed, setAuthed] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [editing, setEditing] = useState<Partial<Post> | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const login = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem('blog_authed', '1')
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 1500)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('blog_authed')) setAuthed(true)
  }, [])

  const fetchPosts = () => {
    supabase
      .from('posts')
      .select('id, title, slug, excerpt, published_at, is_published, tags')
      .order('published_at', { ascending: false })
      .then(({ data }) => setPosts(data as Post[] || []))
  }

  useEffect(() => {
    if (authed) fetchPosts()
  }, [authed])

  const newPost = () => setEditing({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: [],
    is_published: false,
  })

  const handleTitleChange = (val: string) => {
    setEditing(e => ({
      ...e!,
      title: val,
      slug: e?.id ? e.slug : slugify(val),
    }))
  }

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const payload = {
      title: editing.title,
      slug: editing.slug,
      excerpt: editing.excerpt,
      content: editing.content,
      tags: editing.tags || [],
      is_published: editing.is_published,
      published_at: editing.published_at || new Date().toISOString(),
    }
    if (editing.id) {
      await supabase.from('posts').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('posts').insert(payload)
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    fetchPosts()
    setEditing(null)
  }

  const togglePublish = async (post: Post) => {
    await supabase.from('posts').update({ is_published: !post.is_published }).eq('id', post.id)
    fetchPosts()
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await supabase.from('posts').delete().eq('id', id)
    fetchPosts()
  }

  if (!authed) return (
    <div className="bodyEl">
      <div className="sectionWrapper adminLogin">
        <h5>Admin Access</h5>
        <div className={`adminPwBox ${pwError ? 'shake' : ''}`}>
          <input
            type="password"
            placeholder="Password"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="adminInput"
          />
          <button onClick={login} className="adminBtn">Enter</button>
        </div>
        {pwError && <p className="adminError">Wrong password.</p>}
      </div>
    </div>
  )

  return (
    <div className="bodyEl">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: easing }}
        className="sectionWrapper">

        <div className="adminHeader">
          <h5>Blog Admin</h5>
          <button className="adminNewBtn" onClick={newPost}>
            <Plus size={14} /> New Post
          </button>
        </div>

        {editing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="adminEditor">

            <input
              className="adminInput adminInputTitle"
              placeholder="Post title..."
              value={editing.title || ''}
              onChange={e => handleTitleChange(e.target.value)}
            />
            <input
              className="adminInput"
              placeholder="slug (auto-generated)"
              value={editing.slug || ''}
              onChange={e => setEditing(e2 => ({ ...e2!, slug: e.target.value }))}
            />
            <input
              className="adminInput"
              placeholder="Short excerpt (optional)"
              value={editing.excerpt || ''}
              onChange={e => setEditing(e2 => ({ ...e2!, excerpt: e.target.value }))}
            />
            <input
              className="adminInput"
              placeholder="Tags (comma separated)"
              value={(editing.tags || []).join(', ')}
              onChange={e => setEditing(e2 => ({
                ...e2!,
                tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              }))}
            />
            <textarea
              className="adminInput adminTextarea"
              placeholder="Write in Markdown..."
              value={editing.content || ''}
              onChange={e => setEditing(e2 => ({ ...e2!, content: e.target.value }))}
            />

            <div className="adminEditorFooter">
              <label className="adminToggle">
                <input
                  type="checkbox"
                  checked={editing.is_published || false}
                  onChange={e => setEditing(e2 => ({ ...e2!, is_published: e.target.checked }))}
                />
                <span>{editing.is_published ? 'Published' : 'Draft'}</span>
              </label>
              <div className="adminEditorActions">
                <button className="adminCancelBtn" onClick={() => setEditing(null)}>Cancel</button>
                <button className="adminBtn adminSaveBtn" onClick={save} disabled={saving}>
                  {saving ? 'Saving...' : saved ? <><Check size={14} /> Saved!</> : 'Save Post'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="blogs adminPostList">
          {posts.length === 0 && !editing && (
            <div className="blogsEmpty">No posts yet. Create your first one.</div>
          )}
          {posts.map(post => (
            <div key={post.id} className="adminPostRow">
              <div className="adminPostInfo" onClick={() => setEditing(post)}>
                <span className="blogTitle">{post.title}</span>
                <span className="blogDate">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </span>
              </div>
              <div className="adminPostActions">
                <button
                  className={`adminIconBtn ${post.is_published ? 'published' : 'draft'}`}
                  onClick={() => togglePublish(post)}
                  title={post.is_published ? 'Unpublish' : 'Publish'}>
                  {post.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button className="adminIconBtn adminDelete" onClick={() => deletePost(post.id)} title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  )
}