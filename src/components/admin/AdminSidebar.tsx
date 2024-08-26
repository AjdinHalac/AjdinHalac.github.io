import { Box, Center, Flex, FlexProps, Icon, useColorModeValue } from "@chakra-ui/react";
import React, { ReactText } from "react";
import { IconType } from "react-icons";
import { EmailIcon, StarIcon, AttachmentIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Logo } from "../common/Logo";

const AdminSidebar = () => {
  return (
    <Box h="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <Center as="a" href="/#/" h="20">
            <Logo  color={"teal.500"} />
        </Center>

        <NavItem link="/#/admin/dashboard" icon={HamburgerIcon as IconType}>
          Dashboard
        </NavItem>

        <NavItem link="/#/admin/users" icon={EmailIcon as IconType}>
          Users
        </NavItem>

        <NavItem link="/#/admin/articles" icon={AttachmentIcon as IconType}>
          Articles
        </NavItem>

        <NavItem link="/#/admin/tags" icon={StarIcon as IconType}>
          Tags
        </NavItem>

        <NavItem link="/#/admin/tos" icon={EditIcon as IconType}>
          Terms of Service
        </NavItem>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  link: string
  icon: IconType
  children: ReactText
}

const NavItem = ({ link, icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={`${link}`}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'teal.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

export default React.memo(AdminSidebar);
