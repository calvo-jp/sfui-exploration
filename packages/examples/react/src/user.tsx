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
  CloseButton,
  HStack,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { HomeIcon } from "@heroicons/react/24/outline";
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
            <Alert status="loading">
              <AlertIcon />

              <Box flexGrow={1}>
                <AlertTitle>Hello world</AlertTitle>
                <AlertDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, eaque?
                </AlertDescription>
              </Box>

              <CloseButton />
            </Alert>
          </TabPanel>
          <TabPanel>Tab 2</TabPanel>
          <TabPanel>Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
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
