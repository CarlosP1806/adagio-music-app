import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { uploadToCloud } from "../services/recording.services";

function RecordButton() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function enableStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(blob);
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

  function startRecording() {
    if (!mediaRecorderRef.current) return;
    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    setRecording(true);
  }

  function stopRecording() {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setRecording(false);
    onOpen();
  }

  async function uploadRecording(filename: string) {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, `${filename}.wav`);
    await uploadToCloud(formData);
  }

  return (
    <>
      <Box
        mt="2rem"
        onClick={recording ? stopRecording : startRecording}
        backgroundColor="#FF6E9D"
        width="5rem"
        height="5rem"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={recording ? "/stop-button.png" : "/record-button.png"}
          boxSize="2.5rem"
        />
      </Box>
      <SaveRecordingModal
        open={isOpen}
        onClose={onClose}
        onSubmitRecording={uploadRecording}
      />
    </>
  );
}

interface SaveRecordingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitRecording: (filename: string) => void;
}

function SaveRecordingModal({
  open,
  onClose,
  onSubmitRecording,
}: SaveRecordingModalProps) {
  const [filename, setFilename] = useState("");

  function handleSubmit() {
    onSubmitRecording(filename);
    console.log(filename);
    onClose();
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="80%">
        <ModalHeader>Save Recording</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Filename"
            onChange={(e) => setFilename(e.target.value)}
            value={filename}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            backgroundColor="#FF6E9D"
            color="whitesmoke"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RecordButton;
