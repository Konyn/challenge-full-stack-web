import apiClient from "@/composables/axios.config";
import type { IStudent } from "@/interfaces/IStudent";

export default class AdminServices {
  static async list(page: number | null, perPage: number | null) {
    const response = await apiClient.get("/admin/student/list", {
      params: {
        page,
        perPage,
      },
    });
    return response;
  }
  static async studentById(id: string | number) {
    const response = await apiClient.get(`/admin/student/${id}`);
    return response;
  }
  static async register(payload: IStudent) {
    const response = await apiClient.post("/admin/student/create", payload);
    return response;
  }
  static async update(payload: IStudent) {
    return  await apiClient.patch(
      `/admin/student/${payload.id}/edit`,
      payload
    );
  }
  static async delete(id: string | number) {
    const response = await apiClient.delete(`/admin/student/${id}`);
    return response;
  }
}
