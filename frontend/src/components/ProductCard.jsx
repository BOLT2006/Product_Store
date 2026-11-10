import {
  Box,
  Button,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  Portal,
} from "@chakra-ui/react";

import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

import { useProductStore } from "../store/product.js";
import { toaster } from "../components/ui/toaster";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [open, setOpen] = useState(false);

  const { deleteProduct, updateProduct } = useProductStore();

  // Delete Product
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      closable: true,
    });
  };

  // Update Product
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    if (success) {
      setOpen(false);
    }

    toaster.create({
      title: success ? "Success" : "Error",
      description: success ? "Product updated successfully" : message,
      type: success ? "success" : "error",
      closable: true,
    });
  };

  return (
    <Box
      bg={{ base: "white", _dark: "#1e293b" }}
      borderRadius="xl"
      overflow="hidden"
      shadow="md"
      transition="box-shadow 0.2s ease"
      _hover={{
        shadow: "xl",
      }}
    >
      {/* Product Image */}
      <Image
        src={product.image}
        alt={product.name}
        w="full"
        h="220px"
        objectFit="cover"
      />

      {/* Product Details */}
      <Box p={5}>
        <Heading
          as="h3"
          size="md"
          mb={2}
          color={{ base: "gray.800", _dark: "white" }}
        >
          {product.name}
        </Heading>

        <Text
          fontWeight="bold"
          fontSize="xl"
          mb={4}
          color={{ base: "gray.700", _dark: "gray.200" }}
        >
          ₹{product.price}
        </Text>

        {/* Buttons */}
        <HStack gap={2}>
          <IconButton
            aria-label="Edit product"
            colorPalette="blue"
            onClick={() => setOpen(true)}
          >
            <Edit size={18} />
          </IconButton>

          <IconButton
            aria-label="Delete product"
            colorPalette="red"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <Trash2 size={18} />
          </IconButton>
        </HStack>
      </Box>

      {/* Update Dialog */}
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>

                <Dialog.CloseTrigger />
              </Dialog.Header>

              <Dialog.Body>
                <VStack gap={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <Button
                  colorPalette="blue"
                  onClick={() =>
                    handleUpdateProduct(product._id, updatedProduct)
                  }
                >
                  Update
                </Button>

                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default ProductCard;
