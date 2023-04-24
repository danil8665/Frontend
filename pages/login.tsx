import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row, Tabs, message } from 'antd'
import Router, { useRouter } from 'next/router';
import { type } from 'os';
import { useState } from 'react';


const Login = () => {

  const dev = "https://blooming-journey-76324.herokuapp.com/"

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
        type: 'loading',
        content: 'Вход',
        duration: 1,
      })
      .then(() => message.success('Вход выполнен успешно', 3))
  };

  const sucessRegister = () => {
    messageApi
    .open({
      type: 'loading',
      content: 'Регистрация',
      duration: 1.5,
    })
    .then(() => message.success('Регистрация выполнена успешно', 3))
  }

  const error = () => {
    messageApi
    .open({
      type: 'loading',
      content: 'Вход',
      duration: 1.5,
    })
    .then(() => message.error('Неверное имя аккаунта или пароль', 3))
  }

  const onFinish = async (values: any) => {
    const response = await fetch(`https://blooming-journey-76324.herokuapp.com/auth/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }  
    }
  )

    const token = await response.json();
    const username = values;
    localStorage.setItem("token", token["token"]);
    localStorage.setItem('username', username["username"]);

    if ( response.status == 200 ) {
      success()
      setTimeout(() => {
        router.push('/');
      }, 2500)
    }
    else {
      error()
    }

  }

  const onFinishRegister = async (values: any) => {
    const response = await fetch(`https://blooming-journey-76324.herokuapp.com/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    const username = values;
    const token = await response.json();
    localStorage.setItem("token", token["token"]);
    localStorage.setItem('username', username["username"]);
    sucessRegister()
    setTimeout(() => {
      router.push('/');
    }, 2500)
  };

  const onFinishFailed = (errorInfo: any) => {
    setTimeout(() => {
      error()
    }, 2500)
  };

  const router = useRouter();

  return (
    <>
    {contextHolder}
    <div className="loginPage">
      <div className="loginBox">
      <div className='loginForm'>
          <p className="formTitle">Добро пожаловать</p>
          <p className='form'>Пожалуйста войдите или зарегистрируйтесь</p>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: "Регистрация",
                key: '1',
                children:
              <Form
                initialValues={{ remember: true }}
                onFinish={onFinishRegister}
                onFinishFailed={onFinishFailed}
              >
          <Form.Item
                  name='username'
                  rules={[{ required: true, message: 'Пожалуйста введите логин' }]}
                >
                  <Input
                    placeholder="Логин"
                    size='large'
                  />
                </Form.Item>
      
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
                >
                  <Input.Password 
                    placeholder="Пароль"
                  />
                </Form.Item>
      
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
      
                <Form.Item
                 noStyle
                 shouldUpdate
                 >
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
                    Регистрация
                  </Button>
              );
            }}
                </Form.Item>
                </Form>,
              },
              {
                label: "Вход",
                key: '2',
                children:    
              <Form
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
          <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Пожалуйста введите логин' }]}
                >
                  <Input
                    size='large'
                    placeholder="Логин"
                  />
                </Form.Item>
      
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
                >
                  <Input.Password 
                    placeholder="Пароль"
                  />
                </Form.Item>
      
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
      
                <Form.Item
                 noStyle
                 shouldUpdate
                 >
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
                    Вход
                  </Button>
              );
              
            }}
                </Form.Item>
                </Form>,
              },
            ]}
          >
          </Tabs>
          </div>
      </div>
    </div>
    </>
  );
};

export default Login;