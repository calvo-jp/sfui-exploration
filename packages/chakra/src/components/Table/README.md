# Table

## Usage

```tsx
function Component() {
  return (
    <TableContainer>
      <TableHeader>
        <Flex>
          <Box>
            <Heading>Users</Heading>
            <Text>Manage users</Text>
          </Box>

          <Spacer />

          <Button>Create new</Button>
        </Flex>
      </TableHeader>

      <Table>
        <Thead>
          <Tr>
            <Th>
              <Text>User</Text>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map(function (user) {
            return (
              <Tr key={user.id}>
                <Td>
                  <Text>{user.name}</Text>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <TableFooter>
        <Pagination>...</Pagination>
      </TableFooter>
    </TableContainer>
  );
}
```
