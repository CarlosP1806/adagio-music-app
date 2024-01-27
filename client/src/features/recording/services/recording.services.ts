import { baseApi } from "../../../services/baseApi";

export function uploadToCloud(recData: any) {
  return baseApi.post("/recording/upload", recData).then((res) => res.data);
}
