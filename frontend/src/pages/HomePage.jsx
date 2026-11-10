import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="1200px" py={{ base: 8, md: 12 }}>
      <VStack gap={8} align="stretch">
        {/* Page Heading */}
        <Text
          fontSize={{ base: "28px", md: "36px" }}
          fontWeight="bold"
          textAlign="center"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
        >
          Current Products 🚀
        </Text>

        {/* Product Grid */}
        {products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              lg: 3,
            }}
            gap={6}
            w="full"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize="xl"
            textAlign="center"
            fontWeight="bold"
            color="gray.500"
            mt={10}
          >
            No products found 😢{" "}
            <Link to="/create">
              <Text
                as="span"
                color="blue.400"
                _hover={{
                  textDecoration: "underline",
                }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
