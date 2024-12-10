import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TStudent = {
  id: string;
  name: string;
  age: number;
  email: string;
};

type StudentState = {
  students: TStudent[];
};

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<TStudent>) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<TStudent>) => {
      const index = state.students.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } =
  studentSlice.actions;
export default studentSlice.reducer;
