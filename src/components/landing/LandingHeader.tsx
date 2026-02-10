import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Flex,
  Button,
  IconButton,
  Show,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Box,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  HStack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { cookieService } from "../../services/CookieService";
import { authService } from "../../services/AuthService";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { MdAccountCircle } from "react-icons/md";
import { Logo } from "../common/Logo";
import {
  scrollToAbout,
  scrollToBlog,
  scrollToContact,
  scrollToExperience,
  scrollToHero,
  scrollToSkills,
  scrollToTerminal,
  scrollToTools,
} from "../../utils/helpers";

const navItems = [
  { label: "Home", onClick: scrollToHero },
  { label: "About", onClick: scrollToAbout },
  { label: "Experience", onClick: scrollToExperience },
  { label: "Skills", onClick: scrollToSkills },
  { label: "Blog", onClick: scrollToBlog },
  { label: "Terminal", onClick: scrollToTerminal },
  { label: "Tools", onClick: scrollToTools },
  { label: "Contact", onClick: scrollToContact },
];

const LandingHeader = () => {
  const [hidden, setHidden] = useState(true);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const changeScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", changeScroll);
    return () => window.removeEventListener("scroll", changeScroll);
  }, []);

  const bgColor = useColorModeValue(
    scroll ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.6)",
    scroll ? "rgba(23, 25, 35, 0.85)" : "rgba(23, 25, 35, 0.6)",
  );
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.06)",
    "rgba(255, 255, 255, 0.06)",
  );
  const navHoverBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const navColor = useColorModeValue("gray.600", "gray.400");
  const navHoverColor = useColorModeValue("gray.900", "white");
  const drawerBg = useColorModeValue("white", "gray.900");

  return (
    <Box as="nav" role="navigation">
      <Flex
        position="fixed"
        align="center"
        bg={bgColor}
        backdropFilter="blur(20px)"
        px={{ base: 4, md: 6 }}
        h={scroll ? 16 : 20}
        borderBottom="1px solid"
        borderColor={scroll ? borderColor : "transparent"}
        zIndex="sticky"
        as="header"
        justifyContent={"space-between"}
        w="100%"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        className="animate-fade-in-down"
      >
        <Link to="/">
          <Box transition="all 0.3s ease" _hover={{ transform: "scale(1.05)" }}>
            <Logo color={"teal.500"} />
          </Box>
        </Link>

        {/* Desktop */}
        <Flex alignItems={"center"}>
          <Show breakpoint="(min-width: 992px)">
            <HStack spacing={1}>
              {navItems.map((item, index) => (
                <NavLink key={item.label} to="/" onClick={item.onClick} end>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label={item.label}
                    size="sm"
                    px={3}
                    fontWeight={500}
                    color={navColor}
                    borderRadius="lg"
                    position="relative"
                    className="nav-link"
                    _hover={{
                      bg: navHoverBg,
                      color: navHoverColor,
                    }}
                    sx={{
                      animation: `fadeInDown 0.4s ease-out ${index * 0.05}s both`,
                    }}
                  >
                    {item.label}
                  </Button>
                </NavLink>
              ))}
            </HStack>
          </Show>

          <HStack spacing={1} ml={2}>
            <Popover closeOnEsc closeOnBlur placement="bottom-end">
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  fontSize="lg"
                  variant="ghost"
                  color={navColor}
                  icon={<MdAccountCircle />}
                  aria-label="Profile"
                  borderRadius="lg"
                  _hover={{ color: navHoverColor, bg: navHoverBg }}
                />
              </PopoverTrigger>
              <PopoverContent
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="xl"
                w="200px"
              >
                <PopoverArrow />
                <PopoverBody p={2}>
                    {!cookieService.isAuthenticated() && (
                      <>
                        <NavLink to="/signin" end>
                          <Button
                            as="a"
                            variant="ghost"
                            aria-label="SignIn"
                            size="sm"
                            w="100%"
                            justifyContent="flex-start"
                            borderRadius="lg"
                            my={0.5}
                          >
                            Sign In
                          </Button>
                        </NavLink>
                        <NavLink to="/signup" end>
                          <Button
                            as="a"
                            variant="ghost"
                            aria-label="SignUp"
                            size="sm"
                            w="100%"
                            justifyContent="flex-start"
                            borderRadius="lg"
                            my={0.5}
                          >
                            Sign Up
                          </Button>
                        </NavLink>
                      </>
                    )}
                    {cookieService.isAuthenticated() && (
                      <>
                        {cookieService.isAdmin() && (
                          <NavLink to="/admin/dashboard">
                            <Button
                              as="a"
                              variant="ghost"
                              aria-label="Admin"
                              size="sm"
                              w="100%"
                              justifyContent="flex-start"
                              borderRadius="lg"
                              my={0.5}
                            >
                              Admin
                            </Button>
                          </NavLink>
                        )}
                        <NavLink to="/profile" end>
                          <Button
                            as="a"
                            variant="ghost"
                            aria-label="Profile"
                            size="sm"
                            w="100%"
                            justifyContent="flex-start"
                            borderRadius="lg"
                            my={0.5}
                          >
                            Profile
                          </Button>
                        </NavLink>
                        <Button
                          as="a"
                          variant="ghost"
                          aria-label="Logout"
                          size="sm"
                          w="100%"
                          justifyContent="flex-start"
                          borderRadius="lg"
                          my={0.5}
                          onClick={() => authService.logout()}
                          color="red.400"
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </PopoverBody>
                </PopoverContent>
            </Popover>

            <ColorModeSwitcher justifySelf="flex-end" />

            {/* Mobile */}
            <Show breakpoint="(max-width: 991px)">
              <IconButton
                ml={1}
                aria-label="Open Menu"
                size="md"
                variant="ghost"
                borderRadius="lg"
                icon={<HamburgerIcon />}
                onClick={() => setHidden(false)}
              />

              <Drawer
                onClose={() => setHidden(true)}
                isOpen={!hidden}
                size={"full"}
                placement="right"
              >
                <DrawerOverlay
                  bg="blackAlpha.600"
                  backdropFilter="blur(10px)"
                />
                <DrawerContent bg={drawerBg}>
                  <DrawerHeader borderBottomWidth="0">
                    <Flex justifyContent={"space-between"} alignItems="center">
                      <Link to="/">
                        <Logo color={"teal.500"} />
                      </Link>
                      <IconButton
                        aria-label="Close Menu"
                        size="md"
                        variant="ghost"
                        borderRadius="lg"
                        icon={<CloseIcon />}
                        onClick={() => setHidden(true)}
                      />
                    </Flex>
                  </DrawerHeader>
                  <DrawerBody pt={8}>
                    <Flex flexDir="column" align="center" gap={2}>
                      {navItems.map((item, index) => (
                        <NavLink
                          key={item.label}
                          to="/"
                          onClick={() => {
                            item.onClick();
                            setHidden(true);
                          }}
                          end
                          style={{ width: "100%" }}
                        >
                          <Button
                            as="a"
                            variant="ghost"
                            aria-label={item.label}
                            w="100%"
                            size="lg"
                            borderRadius="xl"
                            fontWeight={500}
                            justifyContent="center"
                            sx={{
                              animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
                            }}
                          >
                            <HStack spacing={3}>
                              <Text
                                fontSize="sm"
                                color="teal.400"
                                fontWeight={700}
                              >
                                0{index + 1}.
                              </Text>
                              <Text>{item.label}</Text>
                            </HStack>
                          </Button>
                        </NavLink>
                      ))}
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Show>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LandingHeader;
