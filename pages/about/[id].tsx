import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  FacebookOutlined,
  InstagramOutlined,
  SearchOutlined,
  BulbFilled,
  BulbOutlined,
  LoginOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  FloatButton,
  Form,
  Image,
  MenuTheme,
  message,
  Modal,
  notification,
  Radio,
  Rate,
  Row,
  Skeleton,
  Switch,
} from "antd";
import { Breadcrumb, Layout, Menu, Popover } from "antd";
import Link from "next/link";
import TextArea from "antd/lib/input/TextArea";
import { Typography } from "antd";
import { useRouter } from "next/router";
import { ButtonType } from "antd/lib/button";
import { NotificationPlacement } from "antd/es/notification/interface";
import FastOrder from "../FastOrder";

const { Header, Content, Footer, Sider } = Layout;

const { Title, Text } = Typography;

interface Props {
  id: any;
}

const About: React.FC<Props> = ({ id }) => {
  const [api, contextHolder2] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Внимание`,
      description: "Это мы ещё не допилили :)",
      placement,
    });
  };

  const exit = () => {
    messageApi
      .open({
        type: "loading",
        content: "Выход",
        duration: 1,
      })
      .then(() => message.success("Вы вышли из аккаунта", 3));
  };

  const logOut = () => {
    exit();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("nextauth.message");
    setTimeout(() => {
      router.push("/");
    }, 2500);
  };

  const countDown = () => {
    let secondsToGo = 5;

    const modal = Modal.success({
      title: "Спасибо что оставили отзыв!",
      content: `Это окно закроется через ${secondsToGo} секунд.`,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Это окно закроется через ${secondsToGo} секунд.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  let secondsToGo = 4;

  const [visible, setVisible] = useState(false);

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  const onFinish = (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {};

  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  const [instance, setInstance] = useState<any>("");
  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      fetch(
        `https://backend-dixi-00461a80fa26.herokuapp.com/product/${router.query.id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setInstance(data);
        });
    }
  }, [router.query]);

  const [image, setImage] = useState("");
  useEffect(() => {
    fetch(`https://backend-dixi-00461a80fa26.herokuapp.com/products`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setImage(data);
      });
  }, []);

  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [type, setType] = useState<ButtonType>("primary");

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
    setType(value ? "primary" : "default");
  };

  const [messageApi, contextHolder] = message.useMessage();

  if (typeof window !== "undefined") {
    const item = localStorage.getItem("token");

    if (item)
      return (
        <>
          {contextHolder}
          {contextHolder2}
          <Layout className="layout" style={{ minHeight: "100vh" }}>
            <Sider
              theme={theme}
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              breakpoint={"lg"}
              collapsedWidth={60}
            >
              <Menu mode="vertical" theme={theme}>
                <Menu.Item key={1}>
                  <Link href={"/"}>
                    <HomeOutlined />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Главная{" "}
                  </Link>
                </Menu.Item>
                <Menu.Item key={2}>
                  <Link href={"/addProduct"}>
                    <PlusOutlined />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Добавить товар{" "}
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={3}
                  onClick={() => openNotification("bottomRight")}
                >
                  <UserOutlined />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Профиль{" "}
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <div className="homepage_wrap">
                {/* <div
             className='site-layout-background' 
          > */}
                <Menu
                  className="menuItems"
                  selectable={false}
                  theme={theme}
                  mode="horizontal"
                >
                  <div className="logo">
                    <Menu.Item>
                      {/* <Switch onChange={changeTheme} checked={theme === 'dark'} unCheckedChildren={<BulbFilled />} checkedChildren={<BulbOutlined/>}/>  Тема */}
                    </Menu.Item>
                  </div>
                  <div className="loggedIn">
                    <Menu.Item>
                      {`${localStorage.getItem("username")}`}&nbsp;&nbsp;&nbsp;
                      <Button
                        style={{ marginRight: 10 }}
                        type={type}
                        onClick={logOut}
                        icon={<LogoutOutlined />}
                      >
                        Выйти
                      </Button>
                    </Menu.Item>
                  </div>
                </Menu>
              </div>
              <Content style={{ margin: "0 16px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>{`${instance?.manufacturer}`}</Breadcrumb.Item>
                  <Breadcrumb.Item>{`${instance?.name}`}</Breadcrumb.Item>
                </Breadcrumb>

                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  justify="space-around"
                >
                  <div className="image_card_style">
                    <Image
                      preview={{ visible: false }}
                      width={610}
                      height={610}
                      src={`${instance.picture}`}
                      onClick={() => setVisible(true)}
                    />
                  </div>
                  <div style={{ display: "none" }}>
                    <Image.PreviewGroup
                      preview={{
                        visible,
                        onVisibleChange: (vis) => setVisible(vis),
                      }}
                    >
                      <Image src={`${instance.picture}`} />
                    </Image.PreviewGroup>
                  </div>

                  <div className="about_description">
                    <Card bordered={false}>
                      <h1>Размер</h1>

                      <Radio.Group
                        name="size"
                        defaultValue="a"
                        buttonStyle="solid"
                        style={{ marginTop: 16 }}
                      >
                        <Radio.Button value="a">36</Radio.Button>
                        <Radio.Button value="b" disabled>
                          37
                        </Radio.Button>
                        <Radio.Button value="c">38</Radio.Button>
                        <Radio.Button value="d">39</Radio.Button>
                        <Radio.Button value="e">40</Radio.Button>
                        <Radio.Button value="f">41</Radio.Button>
                      </Radio.Group>
                      <br />
                      <br />
                      <Title level={3}>Цена</Title>
                      <div className="price_discount">
                        <p className="price">{`${instance.price}`}</p>
                        <p className="discount">{`${instance.discount}`}</p>
                      </div>
                      <h1>Оценить(по желанию)</h1>
                      <Rate defaultValue={0} />
                      <Form>
                        <Form.Item>
                          <Title level={4}>Описание:</Title>
                          <div className="modelDescription">{`${instance.name}`}</div>
                        </Form.Item>
                      </Form>
                      <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                      >
                        <Form.Item
                          name="comment"
                          rules={[
                            { required: true, message: "Напишите что-то" },
                          ]}
                        ></Form.Item>
                        <FastOrder />
                      </Form>
                      <div className="comments">
                        <h1>Напишите отзыв:</h1>
                        <Form
                          name="basic"
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          initialValues={{ remember: true }}
                          autoComplete="off"
                        >
                          <Form.Item
                            name="comment"
                            rules={[
                              { required: true, message: "Напишите что-то" },
                            ]}
                          >
                            <TextArea rows={6}></TextArea>
                          </Form.Item>
                          <Form.Item shouldUpdate>
                            {({ getFieldsValue }) => {
                              const { comment } = getFieldsValue();
                              const formIsComplete = !!comment;
                              return (
                                <div className="commentButton">
                                  <Button
                                    onClick={countDown}
                                    type="primary"
                                    htmlType="submit"
                                    className="loginFormButton"
                                    disabled={!formIsComplete}
                                  >
                                    Отправить
                                  </Button>
                                </div>
                              );
                            }}
                          </Form.Item>
                        </Form>
                      </div>
                    </Card>
                  </div>
                </Row>

                <FloatButton.BackTop />
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Dixi Shoes ©2022
                <br />
                <div className="icons">
                  <Link href="https://www.instagram.com/dixi_zp/">
                    <InstagramOutlined />
                  </Link>
                  &nbsp;
                  <Link href="https://m.facebook.com/profile.php?id=100063913516314">
                    <FacebookOutlined href="/" />
                  </Link>
                </div>
              </Footer>
              {/* </div> */}
            </Layout>
          </Layout>
        </>
      );
  }

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Sider
        theme={theme}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint={"lg"}
        collapsedWidth={60}
      >
        <Menu mode="vertical" theme={theme}>
          <Menu.Item key={1}>
            <Link href={"/"}>
              <HomeOutlined />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Главная
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
          </Menu.Item>
          <Menu.Item key={3} onClick={() => openNotification("bottomRight")}>
            <UserOutlined />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Профиль{" "}
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <div className="homepage_wrap">
          <Menu
            className="menuItems"
            selectable={false}
            theme={theme}
            mode="horizontal"
          >
            <div className="logo">
              {/* <Menu.Item>
                <Switch
                  onChange={changeTheme}
                  checked={theme === "dark"}
                  unCheckedChildren={<BulbFilled />}
                  checkedChildren={<BulbOutlined />}
                />{" "}
                Тема
              </Menu.Item> */}
            </div>
            <div className="login">
              <Menu.Item>
                <Link href={"/login"}>
                  <Button type={type} icon={<LoginOutlined />}>
                    Вход
                  </Button>
                </Link>
              </Menu.Item>

              <Menu.Item>
                <Link href={"/login"}>
                  <Button
                    type={type}
                    icon={<PlusOutlined />}
                    style={{ marginLeft: -20 }}
                  >
                    Регистрация
                  </Button>
                </Link>
              </Menu.Item>
            </div>
          </Menu>

          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{`${instance?.manufacturer}`}</Breadcrumb.Item>
              <Breadcrumb.Item>{`${instance?.name}`}</Breadcrumb.Item>
            </Breadcrumb>

            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              justify="space-around"
            >
              <div className="image_card_style">
                <Image
                  preview={{ visible: false }}
                  width={610}
                  height={610}
                  src={`${instance.picture}`}
                  onClick={() => setVisible(true)}
                />
              </div>
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  <Image src={`${instance.picture}`} />
                </Image.PreviewGroup>
              </div>

              <div className="about_description">
                <Card bordered={false}>
                  <h1>Размер</h1>

                  <Radio.Group
                    name="size"
                    defaultValue="a"
                    buttonStyle="solid"
                    style={{ marginTop: 16 }}
                  >
                    <Radio.Button value="a">36</Radio.Button>
                    <Radio.Button value="b" disabled>
                      37
                    </Radio.Button>
                    <Radio.Button value="c">38</Radio.Button>
                    <Radio.Button value="d">39</Radio.Button>
                    <Radio.Button value="e">40</Radio.Button>
                    <Radio.Button value="f">41</Radio.Button>
                  </Radio.Group>
                  <br />
                  <br />
                  <Title level={3}>Цена</Title>
                  <div className="price_discount">
                    <p className="price">{`${instance.price}`}</p>
                    <p className="discount">{`${instance.discount}`}</p>
                  </div>
                  <h1>Оценить(по желанию)</h1>
                  <Rate defaultValue={0} />
                  <Form>
                    <Form.Item>
                      <Title level={4}>Описание:</Title>
                      <div className="modelDescription">{`${instance.name}`}</div>
                    </Form.Item>
                  </Form>
                  <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="comment"
                      rules={[{ required: true, message: "Напишите что-то" }]}
                    ></Form.Item>
                    <FastOrder />
                  </Form>
                  <div className="comments">
                    <h1>Напишите отзыв:</h1>
                    <Form
                      name="basic"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      initialValues={{ remember: true }}
                      autoComplete="off"
                    >
                      <Form.Item
                        name="comment"
                        rules={[{ required: true, message: "Напишите что-то" }]}
                      >
                        <TextArea rows={6}></TextArea>
                      </Form.Item>
                      <Form.Item shouldUpdate>
                        {({ getFieldsValue }) => {
                          const { comment } = getFieldsValue();
                          const formIsComplete = !!comment;
                          return (
                            <div className="commentButton">
                              <Button
                                onClick={countDown}
                                type="primary"
                                htmlType="submit"
                                className="loginFormButton"
                                disabled={!formIsComplete}
                              >
                                Отправить
                              </Button>
                            </div>
                          );
                        }}
                      </Form.Item>
                    </Form>
                  </div>
                </Card>
              </div>
            </Row>

            <FloatButton.BackTop />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Dixi Shoes ©2022
            <br />
            <div className="icons">
              <Link href="https://www.instagram.com/dixi_zp/">
                <InstagramOutlined />
              </Link>
              &nbsp;
              <Link href="https://m.facebook.com/profile.php?id=100063913516314">
                <FacebookOutlined href="/" />
              </Link>
            </div>
          </Footer>
        </div>
      </Layout>
    </Layout>
  );
};
export default About;

{
  /* <Sider theme={theme} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint={'lg'} collapsedWidth={60}>
<Menu mode='vertical' theme={theme}> 
  <Menu.Item key={1}><Link href={'/'}><HomeOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Главная &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></Menu.Item>
</Menu>    
</Sider> */
}
