import React, { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";

const FastOrder: React.FC = () => {
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {};

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi
      .open({
        type: "loading",
        content: "Оформляем",
        duration: 1,
      })
      .then(() => message.success("Заказ выполнен успешно", 3));
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 2000);
    success();
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Быстрый заказ
      </Button>
      <div className="modal_wrap">
        <Modal
          width={360}
          title="Заказ"
          open={open}
          confirmLoading={confirmLoading}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="Отмена"
          footer={[]}
        >
          <Form
            name="basic"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 25 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="ФИО"
              name="name"
              rules={[{ required: true, message: "Пожалуйста введите ФИО" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Номер телефона"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста введите номер телефона",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldsValue }) => {
                const { name, number } = getFieldsValue();
                const formIsComplete = !!name && !!number;
                return (
                  <div className="submitButton">
                    <Button
                      onClick={handleOk}
                      loading={loading}
                      type="primary"
                      htmlType="submit"
                      className="loginFormButton"
                      disabled={!formIsComplete}
                    >
                      Заказать
                    </Button>
                  </div>
                );
              }}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default FastOrder;
