import {
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
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
import { TableContainer, TableHeader } from "@scaleforge-ui/chakra";
import { formatDistanceToNow } from "date-fns";
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
                  <Checkbox />
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
                    <Checkbox />
                    <HStack>
                      <Avatar src={user.avatar} name={user.name} />
                      <Box>
                        <Text size="paragraph-xs-default">{user.name}</Text>
                        <Text size="label-xxs-default" color="neutral.600">
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
                      <Badge key={team} colorScheme="success">
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
      </TableContainer>
    </Box>
  );
}

function CreateUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<Icon as={PlusIcon} />} onClick={onOpen}>
        Add new
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>Hello world</ModalBody>
        </ModalContent>
      </Modal>
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
