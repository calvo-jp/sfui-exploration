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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
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
  useToast,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import {
  ChevronRightIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  HomeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Pagination,
  PaginationControlGroup,
  PaginationNextControl,
  PaginationPageControl,
  PaginationPrevControl,
  PaginationRange,
  PaginationSizeControl,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@sfui/chakra";
import { formatDistanceToNow } from "date-fns";
import * as React from "react";
import { Link } from "react-router-dom";

export function Users() {
  const toast = useToast();

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

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} to="/users">
            Users
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
              <Th>Date Joined</Th>
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
                      <Box as={Link} to="/users/1">
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
                  <AvatarGroup max={5} size="sm">
                    {new Array(10).fill(null).map((_, index) => {
                      return (
                        <Avatar
                          key={index}
                          src={`https://i.pravatar.cc/150?u=${index}`}
                        />
                      );
                    })}
                  </AvatarGroup>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    {user.teams.map((team, index) => (
                      <Badge
                        key={index}
                        colorScheme={["pink", "blue", "orange"][index]}
                      >
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
                <Td>
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="unstyled"
                      minH="unset"
                      h="fit-content"
                    >
                      <Icon
                        display="flex"
                        as={EllipsisVerticalIcon}
                        w={5}
                        h={5}
                      />
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        <MenuItem icon={<Icon as={PencilSquareIcon} />}>
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<Icon as={TrashIcon} />}
                          onClick={() => {
                            toast({
                              description: "This is an error toast",
                              status: "warning",
                            });
                            toast({
                              description: "This is an error toast",
                              status: "error",
                            });
                            toast({ description: "This is a success toast" });
                          }}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <TableFooter>
          <Pagination
            total={200}
            defaultValue={{
              page: 1,
              size: 10,
            }}
          >
            {({ pages }) => {
              return (
                <>
                  <PaginationRange />
                  <Spacer />
                  <PaginationSizeControl />
                  <PaginationControlGroup>
                    <PaginationPrevControl />

                    {pages.map((page, index) => (
                      <PaginationPageControl key={index} {...page} />
                    ))}

                    <PaginationNextControl />
                  </PaginationControlGroup>
                </>
              );
            }}
          </Pagination>
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
            <Flex justifyContent="flex-end" gap={3}>
              <Button
                w="90px"
                onClick={onClose}
                variant="outline"
                colorScheme="neutral"
              >
                Cancel
              </Button>
              <Button w="90px" onClick={onClose}>
                Okay
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const users = new Array(10).fill(null).map(() => {
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
