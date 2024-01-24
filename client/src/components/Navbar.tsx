import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";

interface NavbarProps {
  title: string;
  showBadge: boolean;
}

function Navbar({ title, showBadge }: NavbarProps) {
  return (
    <Flex
      bg="white"
      align="center"
      justify="space-between"
      py="1rem"
      px="1.4rem"
      borderBottomRightRadius="3rem"
    >
      <Box flex="1" display="flex" alignItems="center">
        <Image
          src="/piano_user.png"
          alt="profile picture"
          width="2.5rem"
          objectFit="cover"
          mr=".5rem"
        />
        <Text>Carlos</Text>
      </Box>
      <Box flex="1" textAlign="center">
        {title}
      </Box>
      {showBadge ? <Box>Badge</Box> : <Spacer />}
    </Flex>
  );
}

export default Navbar;
