import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, CardBody, CardHeader, Center, Container, Divider, Fade, Flex, HStack, Image, List, ListIcon, ListItem, Stack, Text } from "@chakra-ui/react";
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
      <Container minW={"sm"} maxW={"4xl"} id="about">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
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
      <Container minW={"sm"} maxW={"4xl"} id="experience">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
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
                      <Image
                        boxSize={"40px"}
                        src={require(`../../images/${selected.image}`)}
                      />
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
    </>
  );
};

export default About;
