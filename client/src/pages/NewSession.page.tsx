import AuthLayout from "../layouts/AuthLayout";
import SessionTimer from "../features/practice-session/components/SessionTimer";
import { useStopwatch } from "react-timer-hook";
import { Flex } from "@chakra-ui/react";
import RecordButton from "../features/recording/components/RecordButton";

function NewSession() {
  const { totalSeconds, seconds, minutes, hours, start, pause } = useStopwatch({
    autoStart: true,
  });

  return (
    <>
      <AuthLayout title="New Session">
        <Flex justify="center" mt="5rem" direction="column" align="center">
          <SessionTimer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            pause={pause}
            start={start}
          />
          <RecordButton />
        </Flex>
      </AuthLayout>
    </>
  );
}

export const NewSessionRoute = {
  element: <NewSession />,
};
