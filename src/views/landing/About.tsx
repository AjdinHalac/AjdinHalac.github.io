import { Box, Button, ButtonGroup, Card, CardHeader, Center, Container, Divider, Fade, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { IExperience } from "../../domain/landing/interfaces";
import experience from "../../experience";

const About = (): ReactElement => {
  const [selected, setSelected] = useState<IExperience>(experience[0]);

  const handleSelected = (value: IExperience) => {
    setSelected(value);
  };

  return (
    <>
      <Container maxW={"3xl"} id="about">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
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
      <Container maxW={"3xl"} id="experience">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
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
          <Stack>
            <Fade in={!!selected}>
              <Card key={selected.company} size="lg">
                <CardHeader>
                  <Flex justifyContent="space-between">
                    <HStack>
                      <Image h={"auto"} w={"50px"} src={require(`../../images/${selected.image}`)} />
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
              </Card>
            </Fade>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default About;
