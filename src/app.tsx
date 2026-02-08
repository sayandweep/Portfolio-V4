import { motion, cubicBezier } from "motion/react"

function App() {
    const easing = cubicBezier(.48,.3,.18,1.15)
  return (
    <>
    <div className="ovrfl">
    <motion.div 
    style={{ fontSize: '.4em', lineHeight: '1', textAlign: 'center' }}
    initial={{ scale: 1, opacity: 0, y: 100 }}
    animate={{ scale: 1, opacity: 1 , y: 0 }} 
    transition={{ duration: 1, ease: easing}}
    >You should connect</motion.div>
    </div>

    <div className="ovrfl">
    <motion.div 
    className="bigText"
    initial={{ scale: 1, opacity: 0, y: 100 }}
    animate={{ scale: 1, opacity: 1 , y: 0 }} 
    transition={{ duration: 1, ease: easing, delay: .2}}
    >Linkedin</motion.div>
    </div>

    <div className="ovrfl">
    <motion.div 
    style={{ fontSize: '.4em', lineHeight: '1', textAlign: 'center', background: 'rgb(4, 44, 20)', color: 'white', padding: '5px', borderRadius: '1px' }}
    initial={{ scale: 1, opacity: 0, y: 100 }}
    animate={{ scale: 1, opacity: 1 , y: 0 }} 
    transition={{ duration: 1, ease: easing, delay: .5}}
    >@sayandweep</motion.div>
    </div>
    </>
  );
}

export default App