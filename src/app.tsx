import { motion, cubicBezier, scroll, animate } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { projects, reels, works } from './components/const';
import { useEffect } from 'react';

function App() {
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
      <motion.div 
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easing }}
      className="sectionWrapper" 
      id="projects">
        <h5>Current Projects</h5>
        <div className="grid">

          {projects.map((project) => (
            <div className="overFlow" onClick={() => window.location.href = project.href} key={project.key}>
            <motion.div
              initial={{ y:500 }}
              animate={{ y:0 }}
              whileHover={{ scale: .9, transition: { duration: 0.2 } }}
              transition={{ duration: .8, ease: easing, delay: project.delay}}
              className="cardBody">
                <img src={project.img} alt={project.key}/>
                <div className="cardLow">
                  <h4>Save My Quotes</h4>
                  <h6>2026</h6>
                </div>
            </motion.div>
          </div>
          ))}
        </div>
      </motion.div>

      {/* articles */}
      <div className="sectionWrapper" id="projects">
        <h5>Edited Reels</h5>
            <section className='img-group-container'>
                <div className='di'>
                  <ul className='img-group'>
                    {Array.isArray(reels) && reels.map((reel) => (
                      <li className='img-container' key={reel.id}>
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
                  <a href="#"><span>View Full Page</span> <ArrowRight /></a>
              </motion.div>
            </section>
      </div>

      {/* worked with */}
      <div className="sectionWrapper" id="worked">
        <h5>Worked with</h5>
        <div className="workbox">
          {works.map((work) => (
            <div key={work.name} className='workedWith'>{work.name} ({work.year})</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App