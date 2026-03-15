import { motion, cubicBezier } from "motion/react"
import { Github, Linkedin, Mail } from 'lucide-react';


export default function Header() {
  const easing = cubicBezier(.48,.3,.18,1.15)



  return (
    <div className="headerEl">
      <div className="header">
        <div style={{ textAlign: "left" }}>
          <div className="overFlow">
            <motion.div
            className="firstHeaderT"
            initial={{ y:100 }}
            animate={{ y:0 }}
            transition={{ duration: .8, ease: easing}}
            onClick={() => {
              window.location.href = "/";
            }}
            >Sayandweep<span style={{color: "greenyellow"}}>.</span></motion.div>
          </div>
          <div className="overFlow">
            <motion.div
            className="sectext"
            initial={{ y:100 }}
            animate={{ y:0 }}
            transition={{ duration: .8, ease: easing, delay: .1}}
            >I Design, Build then Deliver</motion.div>
          </div>
        </div>

        {/* social icons */}
        <div className="socilWrapper"> 

            <a href="//linkedin.com/in/sayandweep" target="_blank">
              <div className="overFlow">
                <motion.div
                className="secondHeaderT"
                initial={{ y:100 }}
                animate={{ y:0 }}
                transition={{ duration: .8, ease: easing, delay: .15}}
                ><Linkedin size={20} strokeWidth={1.5} /></motion.div>
              </div>
            </a>
            <a href="mailto:helllo@sayandweep.in" target="_blank">
              <div className="overFlow">
                <motion.div
                className="secondHeaderT"
                initial={{ y:100 }}
                animate={{ y:0 }}
                transition={{ duration: .8, ease: easing, delay: .2}}
                ><Mail size={20} strokeWidth={1.5} /></motion.div>
              </div>
            </a>
            <a href="//github.com/sayandweep" target="_blank">
              <div className="overFlow">
                <motion.div
                className="secondHeaderT"
                initial={{ y:100 }}
                animate={{ y:0 }}
                transition={{ duration: .8, ease: easing, delay: .25}}
                ><Github size={20} strokeWidth={1.5} /></motion.div>
              </div>
            </a>
        </div>
      </div>

      {/* menu */}
      <div className="mainMenus">
            <div className="menu"><a href="/blogs">Blogs</a></div>
            <div className="menu"><a href="/websites">Websites</a></div>
          </div>

    </div>



  )
}