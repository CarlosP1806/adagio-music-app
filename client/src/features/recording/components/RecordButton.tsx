import { Button, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { uploadToCloud } from "../services/recording.services";

function RecordButton() {
  const [audioData, setAudioData] = useState<string>("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  async function enableStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioData(URL.createObjectURL(audioBlob));

        const formData = new FormData();
        formData.append("file", audioBlob, "recording2.wav");
        formData.append("alias", "test");
        await uploadToCloud(formData);

        audioChunksRef.current = [];
      };
    } catch (err) {
      console.error("Error accessing the microphone", err);
    }
  }

  useEffect(() => {
    enableStream();
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (!mediaRecorderRef.current) return;
    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <>
      <Button onClick={recording ? stopRecording : startRecording}>
        <Text>{recording ? "Stop" : "Record"}</Text>
      </Button>
      {audioData && <audio src={audioData} controls />}
    </>
  );
}

export default RecordButton;
