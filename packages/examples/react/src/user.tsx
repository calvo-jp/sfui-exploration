import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  CloseButton,
  HStack,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VisuallyHidden,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { HomeIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectOption,
  SelectOptions,
  SelectTrigger,
  TableContainer,
} from "@sfui/chakra";
import { Link } from "react-router-dom";

export function User() {
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

      <HStack mt={8} spacing={4}>
        <Avatar src={user.avatar} name={user.name} size="2xl" />
        <Box>
          <Heading size="paragraph-lg">{user.name}</Heading>
          <Text size="label-xs" color="neutral.600">
            @{user.username}
          </Text>
        </Box>
      </HStack>

      <Tabs mt={8}>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Orders</Tab>
          <Tab>Actions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TabOne />
          </TabPanel>
          <TabPanel>
            <TabTwo />
          </TabPanel>
          <TabPanel>
            <TabThree />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function TabThree() {
  return (
    <Box>
      <Box>
        <Select>
          {() => (
            <>
              <SelectTrigger>Choose Option</SelectTrigger>

              <SelectOptions>
                <SelectOption key={1} value="1">
                  One
                </SelectOption>
                <SelectOption key={2} value="2">
                  Two
                </SelectOption>
                <SelectOption key={3} value="3">
                  Three
                </SelectOption>
              </SelectOptions>
            </>
          )}
        </Select>
      </Box>

      <ButtonGroup mt={4} isAttached variant="outline" colorScheme="neutral">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup>
    </Box>
  );
}

function TabTwo() {
  return (
    <TableContainer variant="bordered">
      <Table>
        <Thead>
          <Tr>
            <Th>Brand</Th>
            <Th>Name</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.brand}</Td>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

const products = new Array(5).fill(null).map(() => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    brand: faker.commerce.product(),
    price: faker.commerce.price(),
  };
});

function TabOne() {
  return (
    <Alert>
      <AlertIcon />

      <Box flexGrow={1}>
        <AlertTitle>Hello world</AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          eaque?
        </AlertDescription>
      </Box>

      <CloseButton />
    </Alert>
  );
}

const user = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  teams: new Array(3).fill(null).map(() => faker.color.human()),
  createdAt: faker.date.recent(),
  avatar: faker.internet.avatar(),
};
