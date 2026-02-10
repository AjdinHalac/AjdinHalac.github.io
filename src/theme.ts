import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  colors: {
    brand: {
      50: "#e6fffa",
      100: "#b2f5ea",
      200: "#81e6d9",
      300: "#4fd1c5",
      400: "#38b2ac",
      500: "#319795",
      600: "#2c7a7b",
      700: "#285e61",
      800: "#234e52",
      900: "#1d4044",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
        scrollBehavior: "smooth",
      },
      "*::selection": {
        bg: "teal.400",
        color: "white",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "xl",
        transition: "all 0.3s ease",
      },
      variants: {
        ghost: (props: any) => ({
          _hover: {
            bg: props.colorMode === "dark" ? "whiteAlpha.100" : "gray.100",
            transform: "translateY(-1px)",
          },
        }),
        solid: {
          _hover: {
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
          _active: {
            transform: "translateY(0)",
          },
        },
        outline: {
          borderWidth: "2px",
          _hover: {
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
        },
        gradient: {
          bg: "linear-gradient(135deg, #319795 0%, #38b2ac 50%, #4fd1c5 100%)",
          color: "white",
          _hover: {
            bg: "linear-gradient(135deg, #2c7a7b 0%, #319795 50%, #38b2ac 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 40px -10px rgba(49, 151, 149, 0.5)",
          },
          _active: {
            transform: "translateY(0)",
          },
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === "dark" ? "gray.800" : "white",
          borderRadius: "2xl",
          border: "1px solid",
          borderColor: props.colorMode === "dark" ? "whiteAlpha.100" : "gray.100",
          overflow: "hidden",
          transition: "all 0.3s ease",
          _hover: {
            transform: "translateY(-4px)",
            boxShadow: props.colorMode === "dark"
              ? "0 20px 60px -15px rgba(0,0,0,0.5)"
              : "0 20px 60px -15px rgba(0,0,0,0.1)",
            borderColor: "teal.400",
          },
        },
      }),
    },
    Heading: {
      baseStyle: {
        fontWeight: "800",
        letterSpacing: "-0.02em",
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: "full",
        px: 3,
        py: 1,
        fontWeight: "600",
        fontSize: "xs",
        textTransform: "none",
      },
    },
  },
});

export default theme;