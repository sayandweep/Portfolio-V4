import { motion, cubicBezier, scroll, animate } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { projects, reels, works } from './components/const';
import { useEffect, useState } from 'react';
import { supabase, type Post } from './lib/supabase';

function App() {

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

  // cubic mine :)
  const easing = cubicBezier(0.48, 0.3, 0.18, 1.15);

  // gallery – run after DOM is ready
  useEffect(() => {
    const container = document.querySelector(".img-group-container");
    const group = document.querySelector(".img-group");
    if (!container || !group) return;

    const count = reels.length;
    if (count === 0) return;

    scroll(
      animate(".img-group", {
        transform: ["none", `translateX(-${(count - 1) * 100}px)`],
      }),
      { target: container }
    );
  }, [reels.length]);

  return (
    <div className="bodyEl">
      
      {/* projects */}
      <div
      className="sectionWrapper" 
      id="projects">
        <h5>Current Projects</h5>
        <div className="grid">

          {projects.map((project) => (
            <div className="overFlow" onClick={() => window.location.href = project.href} key={project.key}>
            <div className="cardBody">
                <div className='image'>
                <img src={project.img} alt={project.key}/>
                </div>
                <div className="cardLow">
                  <h4>{project.key}</h4>
                  <h6>{project.year}</h6>
                </div>
            </div>
          </div>
          ))}
        </div>
      </div>

      {/* blogs */}
      <div className="sectionWrapper" id='blogs'>
        <h5>Blogs</h5>
        <div className="blogs">
          {loading ? (
            <div className="blogsEmpty">Loading...</div>
          ) : posts.map((post) => (
            <a href={`/blog/${post.slug}`} key={post.id}>
              <div className='postBody'>
                <div className='title'>{post.title}</div>
                <div className='other'>
                {new Date(post!.published_at).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'} )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* reel*/}
      <div className="sectionWrapper" id="projects">
        <h5>Edited Reels</h5>
            <section className='img-group-container'>
                <div className='di'>
                  <ul className='img-group'>
                    {Array.isArray(reels) && reels.map((reel) => (
                      <li className='img-container' key={reel.id} onClick={() => {window.location.assign('/videos')}}>
                        <video src={reel.src} muted playsInline preload='metadata' autoPlay loop width={100}></video>
                      </li>
                    ))}
                  </ul>
                </div>
              <motion.div 
                transition={{ease: easing}}
                initial={{ scale: 1 }}
                whileHover={{ scale: 2.5, transition: { ease: easing } }}
                className='img-gradient'>
                  <a href="/videos"><span>Click Any Reel</span> <ArrowRight /></a>
              </motion.div>
            </section>
      </div>

      {/* worked with */}
      <div className="sectionWrapper" id="worked">
        <h5>Worked with</h5>
        <div className="workbox">
          {works.map((work) => (
            <div key={work.name} className='workedWith'>{work.name} <small>({work.year})</small></div>
          ))}
        </div>
      </div>

      {/*  */}
    </div>
  )
}

export default App