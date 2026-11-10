import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { Plus, Moon, Sun } from "lucide-react";

import { useColorMode } from "../components/ui/color-mode";
import { useProductStore } from "../store/product.js";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      maxW="1140px"
      px={4}
      bg={{ base: "white", _dark: "#1e293b" }}
      borderRadius="md"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        {/* Logo */}
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        {/* Buttons */}
        <HStack gap={2}>
          <Link to="/create">
            <Button>
              <Plus size={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
