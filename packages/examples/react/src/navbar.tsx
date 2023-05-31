import {
  Avatar,
  AvatarBadge,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  BellIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <Flex
      as="header"
      h="75px"
      px={4}
      py={2}
      borderBottom="1px"
      borderColor="neutral.200"
      alignItems="center"
    >
      <Heading as={Link} to="/" size="header-5">
        Logo
      </Heading>

      <Spacer />

      <HStack spacing={4} alignItems="center">
        <Notification />

        <Menu>
          <MenuButton>
            <Avatar src="https://i.pravatar.cc/300" name="John Doe">
              <AvatarBadge />
            </Avatar>
          </MenuButton>

          <Portal>
            <MenuList>
              <MenuItem icon={<Icon as={Cog6ToothIcon} />}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem icon={<Icon as={PowerIcon} />}>Logout</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </HStack>
    </Flex>
  );
}

function Notification() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        variant="unstyled"
        display="flex"
        alignItems="center"
        icon={<Icon as={BellIcon} w={8} h={8} />}
        aria-label="View notifications"
        onClick={onOpen}
        rounded="full"
      />

      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay mt="75px" />
        <DrawerContent mt="75px">
          <DrawerCloseButton />
          <DrawerBody>
            <Text size="paragraph-xs" lineHeight="tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quas
              sed, ipsa eaque reiciendis quis!
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
