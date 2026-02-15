import {motion, cubicBezier, scroll, animate} from 'motion/react'
import {ArrowRight} from 'lucide-react'


function App() {
  // cubic mine :)
  const easing = cubicBezier(.48,.3,.18,1.15);

  // gallery
  const items = document.querySelectorAll(".img-container");
  scroll(
    animate(".img-group", {
        transform: ["none", `translateX(-${items.length - 1}8vw)`],
    }),
    { target: document.querySelector(".img-group-container") || undefined }
)

  // reels
  const reels = [
    {id: 'A1', src: '/reels/A1.mp4'},
    {id: 'A2', src: '/reels/A2.mp4'},
    {id: 'A3', src: '/reels/A3.mp4'},
    {id: 'A4', src: '/reels/A4.mp4'},
    {id: 'A5', src: '/reels/A5.mp4'},
    {id: 'A6', src: '/reels/A6.mp4'},
  ]

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
          <div className="overFlow" onClick={() => window.location.href = 'https://github.com/sayandweep/SaveMyQuotes'}>
            <motion.div
              initial={{ y:500 }}
              animate={{ y:0 }}
              whileHover={{ scale: .9, transition: { duration: 0.2 } }}
              transition={{ duration: .8, ease: easing, delay: .25}}
              className="cardBody">
                <img src="src/images/savemyquotes.png" alt="posters"/>
                <div className="cardLow">
                  <h4>Save My Quotes</h4>
                  <h6>2026</h6>
                </div>
            </motion.div>
          </div>
          <div className="overFlow">
            <motion.div
            initial={{ y:500 }}
            animate={{ y:0 }}
            whileHover={{ scale: .9, transition: { duration: 0.2 } }}
            transition={{ duration: .8, ease: easing, delay: .30}}
            className="cardBody">
              <img src="src/images/posters.png" alt="posters"/>
              <div className="cardLow">
                <h4>Posters Designs</h4>
                <h6>2020 - </h6>
              </div>
            </motion.div>
          </div>
          <div className="overFlow">
            <motion.div
            initial={{ y:500 }}
            animate={{ y:0 }}
            whileHover={{ scale: .9, transition: { duration: 0.2 } }}
            transition={{ duration: .8, ease: easing, delay: .35}}
            className="cardBody">
              <img src="src/images/videos.png" alt="posters"/>
              <div className="cardLow">
                <h4>Video Edits</h4>
                <h6>2024 - </h6>
              </div>
            </motion.div>
          </div>
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

      {/* articles */}
      <div className="sectionWrapper" id="projects">
        <h5>Worked with</h5>
        <div className="flex">
          {['moc', 'Kovident', 'Edixo', 'amsu'].map((name) => (
            <div key={name} className='workedWith'>{name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App