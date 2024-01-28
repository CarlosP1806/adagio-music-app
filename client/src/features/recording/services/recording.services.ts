import { baseApi } from "../../../services/baseApi";

export function uploadToCloud(recData: FormData) {
  return baseApi.post("/recording/upload", recData).then((res) => res.data);
}
