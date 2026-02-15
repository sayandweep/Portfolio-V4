import { motion, cubicBezier } from "motion/react"
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';


export default function Header() {
  const easing = cubicBezier(.48,.3,.18,1.15)



  return (
    <div className="headerEl">
      <div className="header">
        <div style={{ textAlign: "center" }}>
          <div className="overFlow">
            <motion.div
            className="firstHeaderT"
            initial={{ y:100 }}
            animate={{ y:0 }}
            transition={{ duration: .8, ease: easing}}
            >Sayandweep<span style={{color: "greenyellow"}}>.</span></motion.div>
          </div>
          <div className="overFlow">
            <motion.div
            className="secondHeaderT"
            initial={{ y:100 }}
            animate={{ y:0 }}
            transition={{ duration: .8, ease: easing, delay: .1}}
            >I Design, Build then Deliver</motion.div>
          </div>
          {/* social icons */}
          <div className="socilWrapper"> 

            <a href="">
              <div className="overFlow">
                <motion.div
                className="secondHeaderT"
                initial={{ y:100 }}
                animate={{ y:0 }}
                transition={{ duration: .8, ease: easing, delay: .15}}
                ><Linkedin size={26} strokeWidth={1} /></motion.div>
              </div>
            </a>
            <a href="">
              <div className="overFlow">
                <motion.div
                className="secondHeaderT"
                initial={{ y:100 }}
                animate={{ y:0 }}
                transition={{ duration: .8, ease: easing, delay: .2}}
                ><Mail size={25} strokeWidth={1} /></motion.div>
              </div>
            </a>
            <a href="">
              <div className="overFlow">
                <motion.div
                className="secondHeaderT"
                initial={{ y:100 }}
                animate={{ y:0 }}
                transition={{ duration: .8, ease: easing, delay: .25}}
                ><Twitter size={25} strokeWidth={1} /></motion.div>
              </div>
            </a>
            <a href="">
              <div className="overFlow">
                <motion.div
                className="secondHeaderT"
                initial={{ y:100 }}
                animate={{ y:0 }}
                transition={{ duration: .8, ease: easing, delay: .3}}
                ><Github size={25} strokeWidth={1} /></motion.div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>



  )
}