import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { formatTimeNumber } from "../../../utils/formatting";
import { useState } from "react";

interface SessionTimerProps {
  start: () => void;
  pause: () => void;
  seconds: number;
  minutes: number;
  hours: number;
}

function SessionTimer({
  start,
  pause,
  seconds,
  minutes,
  hours,
}: SessionTimerProps) {
  const [isPaused, setIsPaused] = useState(false);

  function togglePause() {
    if (isPaused) {
      start();
    } else {
      pause();
    }
    setIsPaused(!isPaused);
  }

  return (
    <Flex align="center">
      <Box>
        <Text
          color="whitesmoke"
          fontWeight="bold"
          letterSpacing="1px"
          fontSize="1.8rem"
        >
          {formatTimeNumber(hours)}:{formatTimeNumber(minutes)}:
          {formatTimeNumber(seconds)}
        </Text>
      </Box>
      <Box>
        <Button
          background="none"
          onClick={togglePause}
          _focus={{ background: "none" }}
          _hover={{ background: "none" }}
        >
          <Image
            src={isPaused ? "/play-button.png" : "/pause-button.png"}
            boxSize="3rem"
          />
        </Button>
      </Box>
    </Flex>
  );
}

export default SessionTimer;
