import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Checkbox,
  Flex,
  HStack,
  Heading,
  Icon,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VisuallyHidden,
  useDisclosure,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/20/solid";
import { HomeIcon } from "@heroicons/react/24/outline";
import {
  TableContainer,
  TableFooter,
  TableHeader,
} from "@scaleforge-ui/chakra";
import { formatDistanceToNow } from "date-fns";
import * as React from "react";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <Box
      p={{
        base: 4,
        md: 5,
        lg: 6,
      }}
    >
      <Breadcrumb separator={<Icon as={ChevronRightIcon} />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            <Icon as={HomeIcon} w={4} h={4} />
            <VisuallyHidden>Home</VisuallyHidden>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/users">
            Users
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} to="/users/1">
            johndoe
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <TableContainer mt={4}>
        <TableHeader>
          <Flex alignItems="center">
            <Box>
              <Heading>Users</Heading>
              <Text color="neutral.600">Manage users</Text>
            </Box>

            <Spacer />

            <CreateUser />
          </Flex>
        </TableHeader>

        <Table>
          <Thead>
            <Tr>
              <Th>
                <HStack spacing={3}>
                  <Checkbox size="sm" />
                  <Text fontSize="inherit">User</Text>
                </HStack>
              </Th>
              <Th>Email</Th>
              <Th>Friends</Th>
              <Th>Teams</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <HStack spacing={3}>
                    <Checkbox size="sm" />
                    <HStack>
                      <Avatar src={user.avatar} name={user.name} />
                      <Box>
                        <Text size="paragraph-xs">{user.name}</Text>
                        <Text size="label-xxs" color="neutral.600">
                          @{user.username}
                        </Text>
                      </Box>
                    </HStack>
                  </HStack>
                </Td>
                <Td>{user.email}</Td>
                <Td>
                  <AvatarGroup max={3} size="sm">
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                    <Avatar />
                  </AvatarGroup>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    {user.teams.map((team) => (
                      <Badge key={team} colorScheme="pink">
                        {team}
                      </Badge>
                    ))}
                  </HStack>
                </Td>
                <Td>
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <TableFooter>
          <Text size="paragraph-xxs" color="neutral.700">
            Hello world
          </Text>
        </TableFooter>
      </TableContainer>
    </Box>
  );
}

function CreateUser() {
  const ref = React.useRef<HTMLButtonElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button ref={ref} leftIcon={<Icon as={PlusIcon} />} onClick={onOpen}>
        Add new
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={ref}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader>
            <Heading>Hello</Heading>
          </AlertDialogHeader>
          <AlertDialogBody mt={4}>
            <Text size="paragraph-xs" color="neutral.800">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
              similique ipsam praesentium, dolore suscipit ratione ducimus
              libero excepturi numquam distinctio.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter mt={4}>
            <Flex justifyContent="flex-end">
              <Button onClick={onClose}>Okay</Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const users = new Array(5).fill(null).map(() => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    teams: new Array(3).fill(null).map(() => faker.color.human()),
    createdAt: faker.date.recent(),
    avatar: faker.internet.avatar(),
  };
});
