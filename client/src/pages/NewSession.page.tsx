import AuthLayout from "../layouts/AuthLayout";
import SessionTimer from "../features/practice-session/components/SessionTimer";
import { useStopwatch } from "react-timer-hook";
import { Flex } from "@chakra-ui/react";
import RecordButton from "../features/recording/components/RecordButton";
import { useState } from "react";

function NewSession() {
  const { totalSeconds, seconds, minutes, hours, start, pause } = useStopwatch({
    autoStart: true,
  });

  const [audioData, setAudioData] = useState(null);

  return (
    <>
      <AuthLayout title="New Session">
        <Flex justify="center" pt="3rem">
          <SessionTimer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            pause={pause}
            start={start}
          />
        </Flex>
        <RecordButton />
        <div>ee: {audioData}</div>
      </AuthLayout>
    </>
  );
}

export const NewSessionRoute = {
  element: <NewSession />,
};
