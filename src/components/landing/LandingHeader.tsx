import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Flex,
  Button,
  IconButton,
  Show,
  Popover,
  PopoverTrigger,
  Portal,
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { cookieService } from "../../services/CookieService";
import { authService } from "../../services/AuthService";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { MdAccountCircle } from "react-icons/md";
import { Logo } from "../common/Logo";

const LandingHeader = () => {
  const [hidden, setHidden] = useState(true);
  const [scroll, setScroll] = useState(false);

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener("scroll", changeScroll);

  return (
    <Box as="nav" role="navigation">
      <Flex
        position="fixed"
        align="center"
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        h={16}
        boxShadow={scroll ? "base" : "none"}
        zIndex="1"
        as="header"
        justifyContent={"space-between"}
        w="100%"
      >
        <Link to="/">
          <Logo color={"teal.500"} />
        </Link>
        {/* Desktop */}

        <Flex alignItems={"center"}>
          <Show breakpoint="(min-width: 992px)">
            <NavLink to="/" end>
              <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </NavLink>

            <NavLink to="/about" end>
              <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                About
              </Button>
            </NavLink>

            <NavLink to="/blog" end>
              <Button as="a" variant="ghost" aria-label="Blog" my={5} w="100%">
                Blog
              </Button>
            </NavLink>

            <NavLink to="/terminal" end>
              <Button
                as="a"
                variant="ghost"
                aria-label="Terminal"
                my={5}
                w="100%"
              >
                Terminal
              </Button>
            </NavLink>

            <NavLink to="/contact" end>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Contact
              </Button>
            </NavLink>
          </Show>

          <Popover closeOnEsc closeOnBlur placement="bottom-start">
            <PopoverTrigger>
              <IconButton
                size="md"
                fontSize="lg"
                variant="ghost"
                color="current"
                marginLeft="5"
                icon={<MdAccountCircle />}
                aria-label={`Profile`}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  {!cookieService.isAuthenticated() && (
                    <>
                      <NavLink to="/signin" end>
                        <Button
                          as="a"
                          variant="ghost"
                          aria-label="SignIn"
                          my={2}
                          w="100%"
                        >
                          Sign In
                        </Button>
                      </NavLink>
                      <NavLink to="/signup" end>
                        <Button
                          as="a"
                          variant="ghost"
                          aria-label="SignUp"
                          my={2}
                          w="100%"
                        >
                          Sign Up
                        </Button>
                      </NavLink>
                    </>
                  )}
                  {cookieService.isAuthenticated() && (
                    <>
                      {cookieService.isAdmin() && (
                        <NavLink to="/admin/">
                          <Button
                            as="a"
                            variant="ghost"
                            aria-label="Admin"
                            my={2}
                            w="100%"
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
                          my={2}
                          w="100%"
                        >
                          Profile
                        </Button>
                      </NavLink>
                      <Button
                        as="a"
                        variant="ghost"
                        aria-label="SignUp"
                        my={2}
                        w="100%"
                        onClick={() => authService.logout()}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
          <ColorModeSwitcher justifySelf="flex-end" />
          {/* Mobile */}
          <Show breakpoint="(max-width: 991px)">
            <IconButton
              ml={2}
              aria-label="Open Menu"
              size="lg"
              icon={<HamburgerIcon />}
              onClick={() => setHidden(false)}
            />

            <Drawer
              onClose={() => setHidden(true)}
              isOpen={!hidden}
              size={"full"}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader>
                  <Flex justifyContent={"space-between"}>
                    <Link to="/">
                      <Logo color={"teal.500"} />
                    </Link>
                    <IconButton
                      ml={2}
                      aria-label="Close Menu"
                      size="lg"
                      icon={<CloseIcon />}
                      onClick={() => setHidden(true)}
                    />
                  </Flex>
                </DrawerHeader>
                <DrawerBody>
                  <Flex flexDir="column" align="center">
                    <NavLink to="/" end>
                      <Button
                        as="a"
                        variant="ghost"
                        aria-label="Home"
                        my={5}
                        w="100%"
                      >
                        Home
                      </Button>
                    </NavLink>

                    <NavLink to="/about" end>
                      <Button
                        as="a"
                        variant="ghost"
                        aria-label="About"
                        my={5}
                        w="100%"
                      >
                        About
                      </Button>
                    </NavLink>

                    <NavLink to="/blog" end>
                      <Button
                        as="a"
                        variant="ghost"
                        aria-label="Blog"
                        my={5}
                        w="100%"
                      >
                        Blog
                      </Button>
                    </NavLink>

                    <NavLink to="/terminal" end>
                      <Button
                        as="a"
                        variant="ghost"
                        aria-label="Terminal"
                        my={5}
                        w="100%"
                      >
                        Terminal
                      </Button>
                    </NavLink>

                    <NavLink to="/contact" end>
                      <Button
                        as="a"
                        variant="ghost"
                        aria-label="Contact"
                        my={5}
                        w="100%"
                      >
                        Contact
                      </Button>
                    </NavLink>
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Show>
        </Flex>
      </Flex>
      {/* Mobile Content */}
    </Box>
  );
};

export default LandingHeader;
