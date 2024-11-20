import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  useColorModeValue,
  Grid,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  useToast,
  HStack,
  Input,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import ApiCalls from "../../../domain/common/api/ApiCalls";
import { IScore } from "../../../domain/common/interfaces";
import { parseError } from "../../../utils/helpers";

const MotionBox = motion(Box);

const DinoGame: React.FC = () => {
  const toast = useToast();

  const bgStart = 500;
  const objStart = 500;
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
    const speedFactor = 0.2; // Speed increase factor
    const maxSpeed = 0.3; // Minimum duration limit (maximum speed)

    // Calculate the new duration based on the score
    const newSpeed = baseSpeed - score * speedFactor;
    return newSpeed > maxSpeed ? newSpeed : maxSpeed;
  };

  const getBackgroundSpeed = () => {
    const baseSpeed = 3; // Base speed duration in seconds
    const speedFactor = 0.05; // Speed increase factor
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
      submitScore();
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


  const [name, setName] = useState<string>('Anon');
  const [scores, setScores] = useState<IScore[]>([]);

  const submitScore = async () => {
    try {
      await ApiCalls.submitScore({
        payload: {
          name: name,
          score: score,
        },
      });
      getScores();
    } catch (err) {
      toast({
        title: parseError(err),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getScores = async () => {
    try {
      const response = await ApiCalls.getScores();
      setScores(response.data);
    } catch (err) {
      toast({
        title: parseError(err),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getScores();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid
      templateColumns={{
        base: '1fr', // 1 column on small screens
        lg: '1fr 2fr', // 2/3 and 1/3 columns on medium screens and above
      }}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="60vh"
        width={['xs', 'sm', 'lg', 'md']}
        my={8}
      >
        {status === "start" && (
          <VStack>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                value={name}
                maxLength={4}
                onChange={(e: any) => setName(e.currentTarget.value)}
              />
            </FormControl>
            <Button width="100%" onClick={startGame} colorScheme="teal">
              Start Game
            </Button>
          </VStack>
        )}

        {status === "playing" && (
          <Box
            onClick={jump}
            position="relative"
            w="90%"
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
              bottom="2px"
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
              bottom="2px"
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
              bottom="2px"
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
              height="2px"
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
            <Text fontSize="lg">Your High Score: {highScore}</Text>
            <Button onClick={startGame} mt={4} colorScheme="red">
              Retry
            </Button>
          </Flex>
        )}
      </Flex>

      <Box width={['xs', 'sm', 'lg', 'sm']} my={8} p={4} borderWidth={1} borderRadius="md" boxShadow="lg">
        <Heading mb={4} textAlign="center" size="lg">
          Leaderboard
        </Heading>
        <Table variant="striped" size="md">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Name</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scores.map((entry, index) => (
              <Tr key={`${entry.name}-${index}`}>
                <Td>{index + 1}</Td>
                <Td>{entry.name}</Td>
                <Td isNumeric>{entry.score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Grid>
  );
};

export default DinoGame;
