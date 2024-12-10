import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import StudentManagement from "./components/StudentManagement";

const App: React.FC = () => (
  <Provider store={store}>
    <div style={{ padding: 10 }}>
      <h1>Student Management</h1>
      <StudentManagement />
    </div>
  </Provider>
);

export default App;
