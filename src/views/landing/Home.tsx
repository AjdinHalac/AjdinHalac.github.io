import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
  useColorModeValue,
  createIcon,
  Icon,
  HStack,
  Center,
  Badge,
  CardHeader,
  List,
  ListItem,
  ListIcon,
  Fade,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiCalls from "../../domain/landing/api/ApiCalls";
import { IArticle, IExperience, ITag } from "../../domain/landing/interfaces";
import { parseError, truncate } from "../../utils/helpers";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { ChevronRightIcon } from "@chakra-ui/icons";
import experience from "../../experience";

const Home = (): ReactElement => {
  const toast = useToast();
  const [selected, setSelected] = useState<IExperience>(experience[0]);

  const handleSelected = (value: IExperience) => {
    setSelected(value);
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const [articles, setArticles] = useState<IArticle[]>([]);

  const getArticles = async () => {
    try {
      const response = await ApiCalls.getArticles();
      setArticles(response.data.results);
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
  }, []);

  return (
    <Flex alignItems={"center"} direction={"column"}>
      <Container maxW={"3xl"} id="hero">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
          pt={{ base: 36, md: 52 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl" }}
            lineHeight={"110%"}
          >
            Hi, my name is Ajdin. <br />
            <Text as={"span"} color={"teal.400"}>
              I'm a Software Developer.
            </Text>
          </Heading>
          <Text
            color={"gray.500"}
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
          >
            Test
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme="teal"
              bg={"teal.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: `teal.500`,
              }}
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/ajdin-hala%C4%87-019549121/",
                  "_blank",
                  "noreferrer,noopener"
                );
              }}
            >
              Let's connect!
            </Button>
            <Button
              variant={"link"}
              colorScheme={"blue"}
              size={"sm"}
              onClick={scrollToContact}
            >
              Contact Me
            </Button>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue("gray.800", "gray.300")}
                w={71}
                position={"absolute"}
                right={-71}
                top={"10px"}
              />
              <Text
                fontSize={"lg"}
                fontFamily={"Caveat"}
                position={"absolute"}
                right={"-85px"}
                top={"-15px"}
                transform={"rotate(10deg)"}
              >
                Click me!
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Container minW={"sm"} maxW={"4xl"} id="about">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
            <HStack mx={4}>
              <Text color={"teal.400"} fontWeight={800}>
                01
              </Text>
              <Text fontWeight={800}>About</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Text color={"gray.600"} fontSize={"xl"} px={4}>
            A product-focused Software Developer with experience in Startups,
            Scaleups, and Enterprise. Looking for constant improvement with
            anything related to code, able to contribute to Frontend and DevOps
            but with specialization, previous experiences, and core focus on
            Backend Development, Microservices, and Domain Driven Design.
            Continuously exploring Optimization and Software Architecture.
            Previous domains include Gambling, AI, Biotech, Identity, and
            Marketplace, but open to exploring other options. Currently working
            with GoLang and Java. Hobbies include creating Robots using Arduino
            and Raspberry.
          </Text>
        </Stack>
      </Container>
      <Container minW={"sm"} maxW={"4xl"} id="experience">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
            <HStack mx={4}>
              <Text color={"teal.400"} fontWeight={800}>
                02
              </Text>
              <Text fontWeight={800}>Experience</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Center px={4}>
            <ButtonGroup variant="outline">
              {experience.map((option: IExperience) => (
                <Button
                  colorScheme={
                    selected.value === option.value ? "teal" : "gray"
                  }
                  onClick={() => handleSelected(option)}
                >
                  {option.value}
                </Button>
              ))}
            </ButtonGroup>
          </Center>
          <Stack >
            <Fade in={!!selected}>
              <Card key={selected.company} size="lg">
                <CardHeader>
                  <Flex justifyContent="space-between">
                    <HStack>
                      <Image boxSize={"40px"} src={require(`../../images/${selected.image}`)} />
                      <Box px={2}>
                        <Text fontWeight={600}>{selected.company}</Text>
                        <Text>{selected.position}</Text>
                      </Box>
                    </HStack>
                    <Text px={2} fontWeight={300}>
                      {selected.duration}
                    </Text>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Flex>
                    <List spacing={3}>
                      {selected.listItems.map((item, index) => (
                        <ListItem key={index}>
                          <ListIcon
                            boxSize={6}
                            as={ChevronRightIcon}
                            color={"teal.500"}
                          />
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </Flex>
                </CardBody>
              </Card>
            </Fade>
          </Stack>
        </Stack>
      </Container>
      <Container maxW={"3xl"} id="articles">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={"teal.400"} fontWeight={800}>
                03
              </Text>
              <Text fontWeight={800}>Articles</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack px={4} spacing={4}>
            {articles.length ? (
              articles.map((article: IArticle) => (
                <Fade>
                  <Card
                    key={article.title}
                    direction={{
                      base: "column",
                    }}
                    overflow="hidden"
                  >
                    <Image objectFit="cover" src={article.image} />
                    <Stack>
                      <CardBody>
                        <Heading size="md">{article.title}</Heading>
                        <Text py={2}>
                          {truncate(article.content, 200, "...")}
                        </Text>
                        <HStack py={2}>
                          <Link to={`/articles/${article.id}`}>
                            <Button color={"teal.400"}>Read more</Button>
                          </Link>
                        </HStack>
                        <HStack pt={4} spacing={2}>
                          {article.tags.map((tag: ITag) => (
                            <Badge key={tag.tag} colorScheme={"teal"}>
                              {tag.tag}
                            </Badge>
                          ))}
                        </HStack>
                      </CardBody>
                    </Stack>
                  </Card>
                </Fade>
              ))
            ) : (
              <Stack justifyContent="center" alignItems="center">
                <Heading size="lg">No articles yet</Heading>
                <Text>
                  <Box as="span" color={"teal.500"}>
                    <Link to="/terminal">Try</Link>{" "}
                  </Box>
                  the terminal instead.
                </Text>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>
      <Container maxW={"3xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={"teal.400"} fontWeight={800}>
                04
              </Text>
              <Text fontWeight={800}>Contact</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={"3xl"}>Let's stay in touch!</Heading>
            <Text color={"gray.600"} fontSize={"xl"} px={4}>
              I'd love to hear from you! Whether you have questions about my
              products and services, want to discuss a collaboration, or simply
              want to say hello, don't hesitate to reach out. I am eager to
              assist and will get back to you as soon as possible. Your feedback
              and inquiries are important to me, and I look forward to
              connecting with you!
            </Text>
            <Text color={"teal.500"} fontWeight={600} fontSize={"lg"} px={4}>
              ajdin.halac@hotmail.com
            </Text>
            <Center>
              <HStack pt={4} spacing={4}>
                <FaLinkedin
                  onClick={() => {
                    window.open(
                      "https://www.linkedin.com/in/ajdin-hala%C4%87-019549121/",
                      "_blank",
                      "noreferrer,noopener"
                    );
                  }}
                  size={28}
                />
                <FaGithub
                  onClick={() => {
                    window.open(
                      "https://github.com/AjdinHalac",
                      "_blank",
                      "noreferrer,noopener"
                    );
                  }}
                  size={28}
                />
                <FaEnvelope
                  onClick={() => {
                    window.open(
                      "mailto:ajdin.halac@hotmail.com",
                      "_blank",
                      "noreferrer,noopener"
                    );
                  }}
                  size={28}
                />
              </HStack>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
};

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

export default Home;
