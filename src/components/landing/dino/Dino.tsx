import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";

const MotionBox = motion(Box);

const DinoGame: React.FC = () => {
  const bgStart = 470;
  const objStart = 470;
  const [status, setStatus] = useState<"start" | "playing" | "crashed">("start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [objWidth, setObjWidth] = useState(40);
  const [trees, setTrees] = useState("🌲 🌴 🌳");
  const [isJumping, setIsJumping] = useState(false);

  const playerControls = useAnimation();
  const objControls = useAnimation();
  const bgControls = useAnimation();

  const playerRef = useRef<HTMLDivElement>(null);
  const objRef = useRef<HTMLDivElement>(null);

  const dinoColor = useColorModeValue("black", "white");

  const startGame = () => {
    setScore(0);
    setStatus("playing");
    setIsJumping(false);
    animateObjects();
    animateBackground();
  }

  const getObjectSpeed = () => {
    const baseSpeed = 2; // Base speed duration in seconds
    const speedFactor = 0.08; // Speed increase factor
    const maxSpeed = 0.6; // Minimum duration limit (maximum speed)

    // Calculate the new duration based on the score
    const newSpeed = baseSpeed - score * speedFactor;
    return newSpeed > maxSpeed ? newSpeed : maxSpeed;
  };

  const getBackgroundSpeed = () => {
    const baseSpeed = 3; // Base speed duration in seconds
    const speedFactor = 0.03; // Speed increase factor
    const maxSpeed = 1; // Minimum duration limit (maximum speed)

    // Calculate the new duration based on the score
    const newSpeed = baseSpeed - score * speedFactor;
    return newSpeed > maxSpeed ? newSpeed : maxSpeed;
  };

  // Start the game
  const animateBackground = () => {
    bgControls.set({ x: bgStart });

    bgControls.start({
      x: -bgStart,
      transition: {
        duration: getBackgroundSpeed(),
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        onRepeat: () => {
          const objArray = ['🌲           🌴☁          🌳', '🌲     🌲🌲    ☁    🌳', '🌴', '🌳      🌳🌴  ☁    🌴', '🌹🌹', '☁ ☁'];
          setTrees(objArray[Math.floor(Math.random() * objArray.length)]);
        },
      },
    });
  }
  const animateObjects = () => {
    objControls.set({ x: objStart });

    objControls.start({
      x: -objStart,
      transition: {
        duration: getObjectSpeed(),
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        onRepeat: () => {
          const randomWidths = [30, 40, 50, 20];
          setObjWidth(randomWidths[Math.floor(Math.random() * randomWidths.length)]);
        },
      },
    });
  };

  // Handle collision detection
  const checkCollision = () => {
    if (playerRef.current && objRef.current) {
      const playerRect = playerRef.current.getBoundingClientRect();
      const objRect = objRef.current.getBoundingClientRect();

      // Define a buffer for more precise collision detection
      const buffer = -3; // Adjust this value for more/less precision

      // Shrink the player's bounding box by the buffer amount
      const playerLeft = playerRect.left + buffer;
      const playerRight = playerRect.right - buffer;
      const playerTop = playerRect.top + buffer;
      const playerBottom = playerRect.bottom - buffer;

      // Shrink the object's bounding box by the buffer amount
      const objLeft = objRect.left + buffer;
      const objRight = objRect.right - buffer;
      const objTop = objRect.top + buffer;
      const objBottom = objRect.bottom - buffer;

      // Check for collision with adjusted bounding boxes
      if (
        playerRight > objLeft &&
        playerLeft < objRight &&
        playerBottom > objTop &&
        playerTop < objBottom
      ) {
        setStatus("crashed");
        objControls.stop();
        bgControls.stop();
      }
    }
  };

  useEffect(() => {
    if (status === "crashed") {
      setHighScore((prevHighScore) => (score > prevHighScore ? score : prevHighScore));
    }
  }, [status, score]);

  const jump = async () => {
    if (status === "playing" && !isJumping) {
      setIsJumping(true); // Prevent further jumps
      await playerControls.start({ y: -135, transition: { duration: 0.3 } });
      await playerControls.start({ y: 0, transition: { duration: 0.3 } });
      setIsJumping(false); // Allow jumping again
    }
  };

  // Manage game status and score
  useEffect(() => {
    animateBackground();
    animateObjects();
    let interval: NodeJS.Timeout;
    if (status === "playing") {
      interval = setInterval(() => {
        setScore((prev) => prev + 1);
        checkCollision();
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="60vh"
      width={"xl"}
    >
      {status === "start" && (
        <Button onClick={startGame} colorScheme="teal">
          Start Game
        </Button>
      )}

      {status === "playing" && (
        <Box
          onClick={jump}
          position="relative"
          w="80%"
          h="60vh"
          bg="transparent"
          borderColor={dinoColor}
          overflow="hidden"
        >
          {/* Player */}
          <MotionBox
            ref={playerRef}
            animate={playerControls}
            initial={{ y: 0 }}
            position="absolute"
            left="10%"
            bottom="5px"
            bg={dinoColor}
            h="40px"
            w="40px"
            borderRadius="md"
          />

          {/* Obstacle */}
          <MotionBox
            ref={objRef}
            animate={objControls}
            initial={{ x: objStart }}
            position="absolute"
            bottom="5px"
            bg="red.500"
            h="40px"
            w={`${objWidth}px`}
            borderRadius="md"
          />

          {/* Background Trees */}
          <MotionBox
            animate={bgControls}
            initial={{ x: bgStart }}
            position="absolute"
            bottom="5px"
            fontSize="2xl"
            opacity={0.5}
            whiteSpace="nowrap"
            zIndex={-10}
          >
            {trees}
          </MotionBox>

          {/* Ground */}
          <Box
            position="absolute"
            bottom="0"
            width="100%"
            height="5px"
            bg={dinoColor}
          />

          {/* Score Display */}
          <Text position="absolute" top="2" right="4" fontSize="lg">
            Score: {score}
          </Text>
        </Box>
      )}

      {status === "crashed" && (
        <Flex direction="column" align="center" mt={6}>
          <Text fontSize="xl">You crashed! Score: {score}</Text>
          <Text fontSize="lg">High Score: {highScore}</Text>
          <Button onClick={startGame} mt={4} colorScheme="red">
            Retry
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default DinoGame;
