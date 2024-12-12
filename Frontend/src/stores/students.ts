// Utilities
import type IPaginate from "@/interfaces/IPaginate";
import type { IStudent } from "@/interfaces/IStudent";
import AdminServices from "@/services/admin/intex";
import { defineStore } from "pinia";
import {useNotificationStore} from "@/stores/notifications";

export const useStudentsStore = defineStore("students", {
  state: () => ({
    search: "",
    student: {} as IStudent,
    students: [] as IStudent[],
    paginate: {} as IPaginate,
    errors: null,
  }),
  actions: {
    setSearch(search: string) {
      this.search = search;
    },
    setStudent(student: IStudent) {
      this.student = student;
    },
    setErrors() {
      this.errors = null;
    },
    setNotification(message: string,type:string = 'success') {
      const notification = useNotificationStore();
      notification.setNotification(message,type)
    },
    async studentById(id: string | number) {
      await AdminServices.studentById(id)
        .then((response) => {
          this.student = response.data.data;
        })
        .catch((error) => {
          this.errors = error.response.data;
        });
    },

    async listStudent(
      page: number | null = null,
      perPage: number | null = null
    ) {
      await AdminServices.list(page, perPage)
        .then((response) => {
          this.students = response.data.data;
          // this.paginate = response.data.data.meta;
        })
        .catch((error) => {
          this.errors = error.response.data;
        });
    },
    async deleteStudent(id: number) {
      await AdminServices.delete(id)
        .then((response) => {
          console.log(response)
          this.students = this.students.filter((student) => student.id !== id);
          this.setNotification(response.data.message)
        })
        .catch((error) => {
          this.errors = error.response.data;
        });
    },
    async updateStudent(payload: IStudent) {
       return await AdminServices.update(payload).then((response) => {
         this.student = response.data.data;
         const index  = this.students.findIndex((student) => student.id === this.student.id);
         this.setNotification(response.data.message)
         if (index !== -1) {
           this.students[index] = this.student;
         }
         return response.data.status;
       }).catch((error) => {
           this.setNotification(error.response.data.errors[0].message,'error')
           this.errors = error.response.data.errors[0].message;
           return error;
         });
    },
    async registerStudent(payload: IStudent) {
      try {
        const response = await AdminServices.register(payload);
        this.students.push(response.data.data);
      } catch (error) {
        this.errors = error.response.data.errors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});
        throw error;
      }

    },
  },
  getters: {
    getSearch: (state) => state.search,
    getStudent: (state) => state.student,
    getStudents: (state) => state.students,
    getStudentsPaginate: (state) => state.paginate,
    getErrors: (state) => state.errors,
  },
});
