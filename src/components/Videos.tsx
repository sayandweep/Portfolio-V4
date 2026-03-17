import { backInOut, motion } from "motion/react"
import { X, Circle }  from "lucide-react"
import { useState } from 'react'

function Videos() {



  const [isPop1Open, setIsPop1Open] = useState(true);
  const [isPop2Open, setIsPop2Open] = useState(true);
  const [isPop3Open, setIsPop3Open] = useState(true);

  function clickClose1() {
    setIsPop1Open(false);
  }

  function clickClose2() {
    setIsPop2Open(false);
  }

  function clickClose3() {
    setIsPop3Open(false);
  }



  return (
    <div className="container">
      <div className="videoPage">
      <p>I edited more than</p>
        <div className='overFlow' style={{background: 'greenyellow', color: 'black', display: 'inline-block'}}>
          <motion.h1
          transition={{ease: backInOut, duration: 1}}
          initial={{ y:100 }}
          animate={{ y:0 }}
          >450+</motion.h1>
        </div>
        <p>videos in 2025 alone</p>

        {isPop1Open && (
          <div className="video-showcase-box box-1">
          <div className="close-button" onClick={clickClose1}><X size={15} strokeWidth={3}/></div>
          <div className="decoration"><Circle size={15} /><Circle size={15} /><Circle size={15} /></div>
          <div className="video"><video src="/reels/V1.webm" autoPlay muted></video></div>
        </div>
        )}
        {isPop2Open && (
          <div className="video-showcase-box box-2">
          <div className="close-button" onClick={clickClose2}><X size={15} strokeWidth={3}/></div>
          <div className="decoration"><Circle size={15} /><Circle size={15} /><Circle size={15} /></div>
          <div className="video"><video src="/reels/A7.webm" muted autoPlay loop></video></div>
        </div>
        )}
        {isPop3Open && (
          <div className="video-showcase-box-horizontal box-3">
          <div className="close-button" onClick={clickClose3}><X size={15} strokeWidth={3}/></div>
          <div className="decoration"><Circle size={15} /><Circle size={15} /><Circle size={15} /></div>
          <div className="video"><video src="/reels/V10.webm" muted autoPlay loop></video></div>
        </div>
        )}


      </div>
    </div>
  )
}

export default Videos