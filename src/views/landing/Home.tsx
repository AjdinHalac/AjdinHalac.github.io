import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
  useColorModeValue,
  Icon,
  HStack,
  Center,
  Badge,
  CardHeader,
  Fade,
  CardFooter,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  AbsoluteCenter,
  VStack,
  Wrap,
  WrapItem,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiCalls from "../../domain/landing/api/ApiCalls";
import { IExperience } from "../../domain/landing/interfaces";
import { IArticle, IPaginator, ITag } from "../../domain/common/interfaces";
import { parseError, scrollToContact, truncate } from "../../utils/helpers";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTerminal,
  FaCode,
  FaArrowRight,
} from "react-icons/fa";
import experience from "../../experience";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Dino from "../../components/landing/dino/Dino";
import Navigation from "../../components/landing/tools/Navigation";

/* ========== Reusable Section Header ========== */
const SectionHeader = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => {
  const lineColor = useColorModeValue("gray.200", "whiteAlpha.200");
  return (
    <Flex align="center" gap={4} px={4} className="animate-fade-in-up">
      <HStack spacing={2} flexShrink={0}>
        <Text
          className="gradient-text"
          fontWeight={800}
          fontSize="lg"
          fontFamily="mono"
        >
          {number}
        </Text>
        <Heading size="md" fontWeight={800} letterSpacing="-0.02em">
          {title}
        </Heading>
      </HStack>
      <Box flex={1} h="1px" bg={lineColor} />
    </Flex>
  );
};

/* ========== Skill Category ========== */
const skillCategories = [
  {
    name: "Frontend",
    color: "teal",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Chakra UI"],
  },
  {
    name: "Backend",
    color: "blue",
    skills: [
      "Golang",
      "Gorm",
      "Node.js",
      "Express",
      "Java",
      "Spring",
      "PHP",
      "Symfony",
      "PostgreSQL",
      "MySQL",
      "JWT/OAuth",
      "Payment Processing",
    ],
  },
  {
    name: "DevOps & More",
    color: "purple",
    skills: [
      "Git",
      "Linux",
      "Python",
      "DigitalOcean",
      "GitHub Actions",
      "Kubernetes",
      "Docker",
      "DDD",
      "TDD",
      "Software Architecture",
    ],
  },
];

const Home = (): ReactElement => {
  const toast = useToast();
  const [selected, setSelected] = useState<IExperience>(experience[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelected = (value: IExperience) => {
    setSelected(value);
  };

  const [articles, setArticles] = useState<IArticle[]>([]);
  const [paginator, setPaginator] = useState<IPaginator>();

  const getArticles = async () => {
    try {
      const response = await ApiCalls.getArticles("perPage=9");
      setArticles(response.data.results);
      setPaginator(response.data.paginator);
    } catch (err) {
      toast({
        title: parseError(err),
        position: "top-right",
        duration: 5000,
        isClosable: true,
        status: "error",
      });
    }
  };

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line
  }, []);

  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.100");
  const subtleBg = useColorModeValue("gray.50", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.400");
  const bodyText = useColorModeValue("gray.700", "gray.300");
  const colorMode = useColorModeValue("light", "dark");

  return (
    <Flex direction={"column"}>
      {/* ===== HERO SECTION ===== */}
      <Container maxW={"4xl"} id="hero">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 12 }}
          pb={{ base: 20, md: 36 }}
          pt={{ base: 12, md: 52 }}
          className="animate-fade-in-up"
        >
          <VStack spacing={4}>
            <Badge
              colorScheme="teal"
              variant="subtle"
              px={4}
              py={1.5}
              borderRadius="full"
              fontSize="sm"
              fontWeight={600}
              textTransform="none"
            >
              Available for opportunities
            </Badge>
            <Heading
              fontWeight={800}
              fontSize={{ base: "3xl", sm: "5xl", md: "6xl" }}
              lineHeight={"110%"}
              letterSpacing="-0.03em"
            >
              Hi, my name is Ajdin. <br />
              <Text
                as={"span"}
                className="gradient-text"
                fontSize={{ base: "3xl", sm: "5xl", md: "6xl" }}
              >
                Backend-first.
                <br />
                Production-minded.
              </Text>
            </Heading>
          </VStack>
          <Text
            color={mutedText}
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            I design and ship high performance backend services using Go,
            Node.js, and distributed systems. Focused on uptime, observability,
            and clean architecture.
          </Text>
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={4}
            align={"center"}
            alignSelf={"center"}
            pt={4}
          >
            <Button
              size="lg"
              bg="linear-gradient(135deg, #319795 0%, #38b2ac 50%, #4fd1c5 100%)"
              color="white"
              rounded={"full"}
              px={8}
              fontWeight={700}
              _hover={{
                bg: "linear-gradient(135deg, #2c7a7b 0%, #319795 50%, #38b2ac 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 40px -10px rgba(49, 151, 149, 0.5)",
              }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.3s ease"
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/ajdin-halac/",
                  "_blank",
                  "noreferrer,noopener",
                );
              }}
              rightIcon={<FaArrowRight />}
            >
              Let's connect
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="teal"
              rounded="full"
              px={8}
              fontWeight={600}
              onClick={scrollToContact}
            >
              Contact me
            </Button>
          </Stack>
        </Stack>
      </Container>

      {/* ===== ABOUT SECTION ===== */}
      <Container maxW={"4xl"} id="about">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 12 }}
          pb={{ base: 20, md: 36 }}
        >
          <SectionHeader number="01" title="About" />
          <VStack
            spacing={5}
            color={bodyText}
            fontSize={{ base: "lg", md: "xl" }}
            px={4}
            lineHeight="tall"
            maxW="3xl"
            mx="auto"
            textAlign="left"
          >
            <Text>
              I'm a backend-focused software engineer with experience building
              and scaling production systems across startups, scaleups, and
              enterprise teams. My work centers on{" "}
              <Text as="span" color="teal.400" fontWeight={600}>
                backend architecture
              </Text>
              ,{" "}
              <Text as="span" color="teal.400" fontWeight={600}>
                microservices
              </Text>
              , and{" "}
              <Text as="span" color="teal.400" fontWeight={600}>
                Domain-Driven Design
              </Text>
              , with a strong emphasis on reliability, performance, and
              maintainability.
            </Text>
            <Text>
              I regularly work close to infrastructure and DevOps concerns and
              can contribute to frontend development when needed, but my primary
              focus remains backend systems and software architecture.
            </Text>
            <Text>
              I've delivered solutions across fintech, identity, marketplaces,
              AI, biotech, and gambling domains. My current toolset includes{" "}
              <Text as="span" color="teal.400" fontWeight={600}>
                Go
              </Text>
              ,{" "}
              <Text as="span" color="teal.400" fontWeight={600}>
                JavaScript
              </Text>
              , and{" "}
              <Text as="span" color="teal.400" fontWeight={600}>
                Java
              </Text>
              .
            </Text>
            <Text>
              Outside of software, I experiment with hardware projects using
              Arduino and Raspberry Pi.
            </Text>
          </VStack>
        </Stack>
      </Container>

      {/* ===== MY PRODUCT SECTION ===== */}
      <Container maxW={"4xl"} id="product">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 12 }}
          pb={{ base: 20, md: 36 }}
        >
          <SectionHeader number="02" title="My Product" />
          <Stack px={4}>
            <Card
              size="lg"
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                bg: "linear-gradient(90deg, #319795, #38b2ac, #4fd1c5, #81e6d9)",
                backgroundSize: "200% 100%",
                animation: "gradient-shift 3s ease infinite",
              }}
            >
              <CardHeader>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={3}
                >
                  <HStack>
                    <Image
                      h={"auto"}
                      w={"50px"}
                      src={require(`../../images/upti.png`)}
                      alt="upti.my logo"
                      borderRadius="lg"
                    />
                    <Box px={2} textAlign="left">
                      <Text fontWeight={700} fontSize="xl">
                        upti.my
                      </Text>
                      <Text
                        className="gradient-text"
                        fontWeight={600}
                        fontSize="sm"
                      >
                        Founder & CEO
                      </Text>
                    </Box>
                  </HStack>
                  <Badge
                    colorScheme="teal"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                  >
                    2024 — Current
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <Box>
                  <Text
                    color={bodyText}
                    fontSize={"md"}
                    mb={5}
                    px={2}
                    lineHeight="tall"
                  >
                    A comprehensive uptime monitoring and incident management
                    platform that I've architected and developed end-to-end.
                    From infrastructure services performing health checks to
                    client-facing applications with custom status pages, upti.my
                    provides 24/7 monitoring, automated recovery, and real-time
                    alerts for websites, APIs, and servers.
                  </Text>
                  <Wrap spacing={2} px={2}>
                    {[
                      "Uptime Monitoring",
                      "Self-Healing Systems",
                      "Incident Management",
                      "Real-time Alerts",
                      "Custom Status Pages",
                      "API & Server Monitoring",
                      "SLA Monitoring",
                      "Automated Recovery",
                      "Performance Analytics",
                      "Custom Domain Support",
                      "DNS Verification",
                      "24/7 Health Checks",
                    ].map((feature, index) => (
                      <WrapItem key={index}>
                        <Badge
                          colorScheme="teal"
                          variant="subtle"
                          fontSize="xs"
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          {feature}
                        </Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                  <Box mt={5} p={4} bg={subtleBg} borderRadius="xl">
                    <Text fontSize="sm" color={mutedText} fontStyle="italic">
                      <Text as="span" fontWeight={700} color="teal.400">
                        Full-Stack Development:
                      </Text>{" "}
                      Designed and built the entire platform including UI/UX,
                      backend services, infrastructure architecture, monitoring
                      algorithms, and automated systems.
                    </Text>
                  </Box>
                  <Center pt={6}>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      borderRadius="full"
                      px={6}
                      rightIcon={<ArrowForwardIcon />}
                      onClick={() => {
                        window.open(
                          "https://upti.my",
                          "_blank",
                          "noreferrer,noopener",
                        );
                      }}
                    >
                      Visit upti.my
                    </Button>
                  </Center>
                </Box>
              </CardBody>
            </Card>
          </Stack>
        </Stack>
      </Container>

      {/* ===== EXPERIENCE SECTION ===== */}
      <Container maxW={"4xl"} id="experience">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 12 }}
          pb={{ base: 20, md: 36 }}
        >
          <SectionHeader number="03" title="Experience" />
          <Center px={4}>
            <ButtonGroup
              variant="outline"
              flexWrap="wrap"
              justifyContent="center"
              gap={2}
            >
              {experience.map((option: IExperience) => (
                <Button
                  key={option.value}
                  colorScheme={
                    selected.value === option.value ? "teal" : "gray"
                  }
                  variant={
                    selected.value === option.value ? "solid" : "outline"
                  }
                  borderRadius="full"
                  size="sm"
                  px={5}
                  onClick={() => handleSelected(option)}
                  transition="all 0.2s"
                >
                  {option.value}
                </Button>
              ))}
            </ButtonGroup>
          </Center>
          <Stack px={4}>
            <Fade in={!!selected}>
              <Card
                key={selected.company}
                size="lg"
                bg={cardBg}
                border="1px solid"
                borderColor={cardBorder}
                borderRadius="2xl"
              >
                <CardHeader>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={3}
                  >
                    <HStack>
                      <Image
                        h={"auto"}
                        w={"50px"}
                        src={require(`../../images/${selected.image}`)}
                        alt={selected.image}
                        borderRadius="lg"
                      />
                      <Box px={2} textAlign="left">
                        <Text fontWeight={700}>{selected.company}</Text>
                        <Text color={mutedText} fontSize="sm">
                          {selected.position}
                        </Text>
                      </Box>
                    </HStack>
                    <Badge
                      variant="subtle"
                      colorScheme="gray"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {selected.duration}
                    </Badge>
                  </Flex>
                </CardHeader>
                {selected.products && selected.products.length > 0 && (
                  <CardBody pt={0}>
                    <Box>
                      <Text
                        fontWeight={600}
                        mb={3}
                        color="teal.400"
                        fontSize="sm"
                      >
                        Projects & Products:
                      </Text>
                      <Wrap spacing={2}>
                        {selected.products.map((product, index) => (
                          <WrapItem key={index}>
                            <Badge
                              colorScheme="teal"
                              variant="subtle"
                              fontSize="xs"
                              px={3}
                              py={1}
                              borderRadius="full"
                            >
                              {product}
                            </Badge>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </Box>
                  </CardBody>
                )}
              </Card>
            </Fade>
          </Stack>

          <Text color={mutedText} fontSize={"lg"} px={2}>
            Want to know more? Check out my{" "}
            <Text
              as="a"
              href="https://img-strg.fra1.cdn.digitaloceanspaces.com/ajdinhalac.dev/Ajdin%20Halac%20CV.pdf"
              target="_blank"
              rel="noreferrer noopener"
              color="teal.400"
              fontWeight={600}
              _hover={{ textDecoration: "underline" }}
            >
              Resume ↗
            </Text>
          </Text>
        </Stack>
      </Container>

      {/* ===== SKILLS SECTION ===== */}
      <Container maxW={"4xl"} id="skills">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 12 }}
          pb={{ base: 20, md: 36 }}
        >
          <SectionHeader number="04" title="Super Powers" />
          <VStack spacing={8} px={4}>
            {skillCategories.map((category) => (
              <Box key={category.name} w="100%">
                <Text
                  fontWeight={700}
                  fontSize="sm"
                  color={`${category.color}.400`}
                  mb={3}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {category.name}
                </Text>
                <Wrap spacing={2} justify="center">
                  {category.skills.map((skill) => (
                    <WrapItem key={skill}>
                      <Box
                        className="skill-tag"
                        bg={
                          colorMode === "light"
                            ? `${category.color}.50`
                            : `rgba(49, 151, 149, 0.1)`
                        }
                        color={
                          colorMode === "light"
                            ? `${category.color}.700`
                            : `${category.color}.300`
                        }
                        borderColor={`${category.color}.200`}
                        _dark={{ borderColor: `${category.color}.700` }}
                      >
                        {skill}
                      </Box>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            ))}
          </VStack>
        </Stack>
      </Container>

      {/* ===== BLOG SECTION ===== */}
      <Container maxW={"4xl"} id="blog">
        <Stack as={Box} spacing={{ base: 8, md: 12 }} pb={{ base: 20, md: 36 }}>
          <SectionHeader number="05" title="Blog" />
          <SimpleGrid px={4} spacing={5} columns={{ base: 1, lg: 2 }}>
            {articles.length ? (
              articles.map((article: IArticle) => (
                <Card
                  key={article.title}
                  overflow="hidden"
                  bg={cardBg}
                  border="1px solid"
                  borderColor={cardBorder}
                  borderRadius="2xl"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "xl",
                    borderColor: "teal.400",
                  }}
                >
                  <CardHeader pb={2}>
                    <Image
                      objectFit="cover"
                      src={article.image}
                      alt={article.slug}
                      borderRadius="xl"
                    />
                    <Wrap pt={3} spacing={2}>
                      {article.tags
                        ? article.tags.map((tag: ITag) => (
                            <WrapItem key={tag.tag}>
                              <Badge
                                colorScheme="teal"
                                variant="subtle"
                                borderRadius="full"
                                px={2}
                                fontSize="xs"
                              >
                                {tag.tag}
                              </Badge>
                            </WrapItem>
                          ))
                        : null}
                    </Wrap>
                  </CardHeader>
                  <CardBody pt={1}>
                    <Heading size="md" lineHeight="short" mb={2}>
                      {article.title}
                    </Heading>
                    <Text color={mutedText} fontSize="sm" lineHeight="tall">
                      {truncate(article.description, 200, "...")}
                    </Text>
                  </CardBody>
                  <CardFooter pt={0}>
                    <Center width={"100%"}>
                      <Link to={`/blog/${article.slug}`}>
                        <Button
                          rightIcon={<ArrowForwardIcon />}
                          variant="ghost"
                          colorScheme="teal"
                          size="sm"
                          borderRadius="full"
                        >
                          Read more
                        </Button>
                      </Link>
                    </Center>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Stack justifyContent="center" alignItems="center" py={8}>
                <Heading size="lg">No articles yet</Heading>
                <Text color={mutedText}>
                  <Text as="span" color="teal.400" fontWeight={600}>
                    <Link to="/terminal">Try</Link>{" "}
                  </Text>
                  the terminal instead.
                </Text>
              </Stack>
            )}
            {articles.length % 2 === 1 ? (
              <Card
                overflow="hidden"
                bg={cardBg}
                border="1px solid"
                borderColor={cardBorder}
                borderRadius="2xl"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                  borderColor: "teal.400",
                }}
              >
                <CardBody minH={"300px"}>
                  <AbsoluteCenter>
                    <VStack spacing={3}>
                      <Text fontSize="4xl">🦕</Text>
                      <Button
                        onClick={onOpen}
                        colorScheme="teal"
                        variant="outline"
                        borderRadius="full"
                        size="md"
                      >
                        Play the Dino Game!
                      </Button>
                    </VStack>
                  </AbsoluteCenter>
                  <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    size={["sm", "md", "xl", "4xl"]}
                    isCentered
                    scrollBehavior="inside"
                  >
                    <ModalOverlay
                      bg="blackAlpha.600"
                      backdropFilter="blur(10px)"
                    />
                    <ModalContent borderRadius="2xl">
                      <ModalCloseButton />
                      <ModalBody>
                        <Dino />
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </CardBody>
              </Card>
            ) : null}
          </SimpleGrid>
          {(paginator?.totalPages ? paginator?.totalPages > 1 : false) ? (
            <Center width={"100%"}>
              <Link to={`/blog`}>
                <Button
                  colorScheme="teal"
                  borderRadius="full"
                  px={8}
                  rightIcon={<ArrowForwardIcon />}
                >
                  See All Posts
                </Button>
              </Link>
            </Center>
          ) : null}
        </Stack>
      </Container>

      {/* ===== TERMINAL SECTION ===== */}
      <Container maxW={"4xl"} id="terminal">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 12 }}
          pb={{ base: 20, md: 36 }}
        >
          <SectionHeader number="06" title="Terminal" />
          <VStack spacing={6} px={4}>
            <Box
              p={8}
              borderRadius="2xl"
              bg={subtleBg}
              border="1px solid"
              borderColor={cardBorder}
              w="100%"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                bg: "linear-gradient(90deg, #319795, #4fd1c5, #81e6d9)",
              }}
            >
              <VStack spacing={4}>
                <Icon as={FaTerminal} boxSize={8} color="teal.400" />
                <Text color={bodyText} fontSize={"lg"}>
                  Explore the interactive Linux terminal... Who knows, you might
                  even{" "}
                  <Text as="span" color="teal.400" fontWeight={700}>
                    Capture The Flag
                  </Text>
                  .
                </Text>
                <Link to="/terminal">
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    borderRadius="full"
                    px={6}
                    leftIcon={<FaCode />}
                  >
                    Launch Terminal
                  </Button>
                </Link>
              </VStack>
            </Box>
          </VStack>
        </Stack>
      </Container>

      {/* ===== TOOLS SECTION ===== */}
      <Container maxW={"4xl"} id="tools">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 12 }}
          pb={{ base: 20, md: 36 }}
        >
          <SectionHeader number="07" title="Tools" />
          <VStack spacing={6} px={4}>
            <Text color={bodyText} fontSize={"lg"} maxW="2xl">
              A curated collection of developer tools I use daily, streamlined
              into one place. Hopefully at least one makes your workflow easier!
            </Text>
            <Navigation />
          </VStack>
        </Stack>
      </Container>

      {/* ===== CONTACT SECTION ===== */}
      <Container maxW={"4xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 12 }}
          pb={{ base: 20, md: 36 }}
        >
          <SectionHeader number="08" title="Contact" />
          <VStack spacing={6} px={4}>
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              letterSpacing="-0.03em"
            >
              Let's stay in touch!
            </Heading>
            <Text color={bodyText} fontSize={"lg"} maxW="2xl" lineHeight="tall">
              I'd love to hear from you! Whether you have questions about my
              products and services, want to discuss a collaboration, or simply
              want to say hello, don't hesitate to reach out.
            </Text>
            <Button
              as="a"
              href="mailto:ajdin.halac@hotmail.com"
              variant="outline"
              colorScheme="teal"
              borderRadius="full"
              px={8}
              size="lg"
              fontWeight={600}
              leftIcon={<FaEnvelope />}
            >
              ajdin.halac@hotmail.com
            </Button>
            <HStack pt={2} spacing={3}>
              <Tooltip label="LinkedIn" hasArrow>
                <IconButton
                  aria-label="LinkedIn"
                  icon={<FaLinkedin size={20} />}
                  variant="ghost"
                  borderRadius="full"
                  size="lg"
                  className="social-icon"
                  onClick={() => {
                    window.open(
                      "https://www.linkedin.com/in/ajdin-halac/",
                      "_blank",
                      "noreferrer,noopener",
                    );
                  }}
                />
              </Tooltip>
              <Tooltip label="GitHub" hasArrow>
                <IconButton
                  aria-label="GitHub"
                  icon={<FaGithub size={20} />}
                  variant="ghost"
                  borderRadius="full"
                  size="lg"
                  className="social-icon"
                  onClick={() => {
                    window.open(
                      "https://github.com/AjdinHalac",
                      "_blank",
                      "noreferrer,noopener",
                    );
                  }}
                />
              </Tooltip>
              <Tooltip label="Email" hasArrow>
                <IconButton
                  aria-label="Email"
                  icon={<FaEnvelope size={20} />}
                  variant="ghost"
                  borderRadius="full"
                  size="lg"
                  className="social-icon"
                  onClick={() => {
                    window.open(
                      "mailto:ajdin.halac@hotmail.com",
                      "_blank",
                      "noreferrer,noopener",
                    );
                  }}
                />
              </Tooltip>
            </HStack>
          </VStack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Home;
