import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';

export function Layout() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}
