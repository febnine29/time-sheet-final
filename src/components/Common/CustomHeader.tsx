import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";

export interface CustomHeaderProps {
  isOpen: boolean;
  onClose: () => void;
  dataColor: string[];
  color: string;
  setColor: (params: string) => void;
}
type TypeCustoms = "SKINS" | "SETTINGS";

export default function CustomHeader({
  onClose,
  isOpen,
  dataColor,
  color,
  setColor,
}: CustomHeaderProps) {
  const [typeCustom, setTypeCustom] = useState<TypeCustoms>("SKINS");

  return (
    <Drawer onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Flex justifyContent="space-between">
            <Button
              cursor="pointer"
              onClick={() => setTypeCustom("SKINS")}
              colorScheme={typeCustom === "SKINS" ? "teal" : undefined}
            >
              Skins
            </Button>
            <Button
              cursor="pointer"
              onClick={() => setTypeCustom("SETTINGS")}
              colorScheme={typeCustom === "SETTINGS" ? "teal" : undefined}
            >
              Settings
            </Button>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          {/* Skins Body */}
          {typeCustom === "SKINS" &&
            dataColor.map((item, index) => (
              <Box key={index} mt={5} mb={5}>
                <Flex
                  align="center"
                  cursor="pointer"
                  onClick={() => setColor(item)}
                >
                  <Box
                    boxSize={10}
                    bgColor={item}
                    borderRadius={5}
                    mr={2}
                  ></Box>
                  <Box>{item}</Box>
                </Flex>
                <Divider mt={2} />
              </Box>
            ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
