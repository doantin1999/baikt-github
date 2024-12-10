import React, { useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addStudent,
  deleteStudent,
  updateStudent,
} from "../redux/features/students/studentSlice";
import { v4 as uuidv4 } from "uuid";

type TStudent = {
  id: string;
  name: string;
  age: number;
  email: string;
};

const StudentManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const students = useSelector((state: RootState) => state.students.students);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingStudent, setEditingStudent] = useState<TStudent | null>(null);

  const handleFormSubmit = (values: Omit<TStudent, "id">) => {
    if (editingStudent) {
      dispatch(updateStudent({ ...editingStudent, ...values }));
    } else {
      dispatch(addStudent({ id: uuidv4(), ...values }));
    }
    form.resetFields();
    setEditingStudent(null);
    setIsModalOpen(false);
  };

  const handleEdit = (student: TStudent) => {
    setEditingStudent(student);
    form.setFieldsValue(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteStudent(id));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, student: TStudent) => (
        <>
          <Button
            onClick={() => handleEdit(student)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(student.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => {
          setIsModalOpen(true);
          setEditingStudent(null);
        }}
      >
        Add Student
      </Button>
      <Table columns={columns} dataSource={students} rowKey="id" />

      <Modal
        title={editingStudent ? "Edit Student" : "Add Student"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input the age!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement;
