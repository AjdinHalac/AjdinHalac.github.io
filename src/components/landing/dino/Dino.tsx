import { Box, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AnimationControls, motion, useAnimation } from 'framer-motion';

function Dino() {
  const [status, setStatus] = useState<'start' | 'normal' | 'crashed'>('start');

  const playerControls = useAnimation();
  const objControls = useAnimation();
  const bgControls = useAnimation();

  const [objWidth, setObjWidth] = useState(40);
  const [trees, setTrees] = useState('🌲           🌴          🌳');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const jump = async () => {
    await playerControls.start({ y: -150, transition: { duration: 0.27 } });
    await playerControls.start({ y: 0, transition: { duration: 0.25 } });
  };

  const start = () => {
    setTimeout(() => {
      runObjectAnimation();
      runBackgroundAnimation();
    }, 1000);
    checkStatus();
    countScore();
  };

  const runObjectAnimation = () => {
    objControls.start({
      x: -450,
      transition: {
        duration: score > 100 ? 0.9 : 1.3,
        ease: 'linear',
        repeat: Infinity,
        onRepeat: () => {
          const objArray = [40, 50, 30, 20];
          const obj = objArray[Math.floor(Math.random() * objArray.length)];
          setObjWidth(obj);
        },
      },
    });
  };

  const runBackgroundAnimation = () => {
    bgControls.start({
      x: -500,
      transition: {
        duration: score > 100 ? 2.4 : 3,
        ease: 'linear',
        repeat: Infinity,
        onRepeat: () => {
          const objArray = ['🌲           🌴☁          🌳', '🌲     🌲🌲    ☁    🌳', '🌴', '🌳      🌳🌴  ☁    🌴', '🌹🌹', '☁ ☁'];
          const obj = objArray[Math.floor(Math.random() * objArray.length)];
          setTrees(obj);
        },
      },
    });
  };

  const checkStatus = () => {
    objControls.start({
      x: 0,
      transition: {
        duration: 0,
      },
    });
  };


  const countScore = () => {
    setInterval(() => {
      if (status === 'normal') {
        setScore(prevScore => prevScore + 1);
      }
    }, 500);
  };

  const renderGame = () => (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '65vh',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={jump}
    >
      <motion.div
        animate={playerControls}
        initial={{ y: 0 }}
        style={{
          height: '40px',
          width: '40px',
          backgroundColor: '#000',
          position: 'absolute',
          left: '10%',
          bottom: '40%',
        }}
      />
      <motion.div
        animate={objControls}
        initial={{ x: 0 }}
        style={{
          height: '38px',
          width: `${objWidth - 2}px`,
          borderWidth: objWidth > 0 ? '2px' : '0',
          borderColor: 'black',
          backgroundColor: '#fff',
          position: 'absolute',
          left: '110%',
          bottom: '40%',
        }}
      />
      <div
        style={{
          height: '2px',
          width: '95%',
          backgroundColor: 'black',
          position: 'absolute',
          bottom: '40%',
        }}
      />
      <motion.div
        animate={bgControls}
        initial={{ x: 0 }}
        style={{
          fontSize: '25px',
          opacity: 0.4,
          zIndex: -10,
          position: 'absolute',
          bottom: '40%',
          whiteSpace: 'nowrap',
        }}
      >
        {trees}
      </motion.div>
      <div style={{ position: 'absolute', top: 20, right: 30, fontSize: '18px' }}>Score: {score}</div>
    </div>
  );

  const renderCrashed = () => (
    <div style={{ flex: 1, justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', fontSize: '18px' }}>You made {score} Points</div>
      <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>HI: {highScore} Points</div>
      <button
        onClick={() => {
          setTimeout(() => {
            objControls.set({ x: 0 });
            playerControls.set({ y: 0 });
            setScore(0);
            setStatus('normal');
            start();
          }, 1000);
        }}
        style={{ alignSelf: 'center', padding: 5, backgroundColor: 'black', marginTop: 20, color: 'white', fontSize: '15px' }}
      >
        Retry
      </button>
    </div>
  );

  const renderStart = () => (
    <div style={{ flex: 1, justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <button
        onClick={() => {
          setTimeout(() => {
            objControls.set({ x: 0 });
            playerControls.set({ y: 0 });
            setScore(0);
            setStatus('normal');
            start();
          }, 1000);
        }}
        style={{ alignSelf: 'center', padding: 5, backgroundColor: 'black', marginTop: 10, color: 'white', fontSize: '15px' }}
      >
        START
      </button>
    </div>
  );

  const renderUnavailable = () => (
    <div style={{ flex: 1, justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', fontSize: 18 }}>Game unavailable</div>
    </div>
  );

  switch (status) {
    case 'start':
      return renderStart();
    case 'normal':
      return renderGame();
    case 'crashed':
      return renderCrashed();
    default:
      return renderUnavailable();
  }
}

export default Dino;
