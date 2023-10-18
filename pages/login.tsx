import {
  Alert,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Tabs,
  message,
} from "antd";
import Router, { useRouter } from "next/router";
import { type } from "os";
import { useState } from "react";

const Login = () => {
  let secondsToGo = 5;

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 2000);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi
      .open({
        type: "loading",
        content: "Вхід",
        duration: 1,
      })
      .then(() => message.success("Вхід пройшов успішно", 3));
  };

  const sucessRegister = () => {
    messageApi
      .open({
        type: "loading",
        content: "Реєстрація",
        duration: 1.5,
      })
      .then(() => message.success("Реєстрація пройшла успішно", 3));
  };

  const error = () => {
    messageApi
      .open({
        type: "loading",
        content: "Вхід",
        duration: 1.5,
      })
      .then(() => message.error("Невірне ім'я акаунту чи пароль", 3));
  };

  const onFinish = async (values: any) => {
    const response = await fetch(
      `https://backend-dixi-00461a80fa26.herokuapp.com/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const token = await response.json();
    const username = values;
    localStorage.setItem("token", token["token"]);
    localStorage.setItem("username", username["username"]);

    if (response.status == 200) {
      success();
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } else {
      error();
    }
  };

  const onFinishRegister = async (values: any) => {
    const response = await fetch(
      `https://backend-dixi-00461a80fa26.herokuapp.com/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const username = values;
    const token = await response.json();
    localStorage.setItem("token", token["token"]);
    localStorage.setItem("username", username["username"]);
    sucessRegister();
    setTimeout(() => {
      router.push("/");
    }, 2500);
  };

  const onFinishFailed = (errorInfo: any) => {
    setTimeout(() => {
      error();
    }, 2500);
  };

  const router = useRouter();

  return (
    <>
      {contextHolder}
      <div className="loginPage">
        <div className="loginBox">
          <div className="loginForm">
            <p className="formTitle">Ласкаво просимо</p>
            <p className="form">Будь ласка увійдіть або зареєструйтесь</p>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: "Реєстрація",
                  key: "1",
                  children: (
                    <Form
                      initialValues={{ remember: true }}
                      onFinish={onFinishRegister}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Будь-ласка введіьт логін",
                          },
                        ]}
                      >
                        <Input placeholder="Логін" size="large" />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Будь-ласка введіть пароль",
                          },
                        ]}
                      >
                        <Input.Password placeholder="Пароль" />
                      </Form.Item>

                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Запам'ятати мене</Checkbox>
                      </Form.Item>

                      <Form.Item noStyle shouldUpdate>
                        {({ getFieldsValue }) => {
                          const { username, password } = getFieldsValue();
                          const formIsComplete = !!username && !!password;
                          return (
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="loginFormButton"
                              disabled={!formIsComplete}
                              onClick={handleOk}
                              loading={loading}
                            >
                              Реєстрація
                            </Button>
                          );
                        }}
                      </Form.Item>
                    </Form>
                  ),
                },
                {
                  label: "Вхід",
                  key: "2",
                  children: (
                    <Form
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Будь-ласка введіть логін",
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Логін" />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Будь-ласка введіть пароль",
                          },
                        ]}
                      >
                        <Input.Password placeholder="Пароль" />
                      </Form.Item>

                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Запам'ятати мене</Checkbox>
                      </Form.Item>

                      <Form.Item noStyle shouldUpdate>
                        {({ getFieldsValue }) => {
                          const { username, password } = getFieldsValue();
                          const formIsComplete = !!username && !!password;
                          return (
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="loginFormButton"
                              disabled={!formIsComplete}
                              onClick={handleOk}
                              loading={loading}
                            >
                              Вхід
                            </Button>
                          );
                        }}
                      </Form.Item>
                    </Form>
                  ),
                },
              ]}
            ></Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
