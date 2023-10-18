import {
  HomeOutlined,
  UserOutlined,
  InstagramOutlined,
  FacebookOutlined,
  LoadingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Layout,
  Menu,
  MenuTheme,
  FloatButton,
  Row,
  Col,
  Image,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ButtonType } from "antd/lib/button";
import Main from "./main";
import Map from "./Map";
import { NotificationPlacement } from "antd/es/notification/interface";

const Home = () => {
  const [collapsed, setCollapsed] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();
  const [api, contextHolder2] = notification.useNotification();

  const router = useRouter();

  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [type, setType] = useState<ButtonType>("primary");

  const exit = () => {
    messageApi
      .open({
        type: "loading",
        content: "Вихід",
        duration: 1,
      })
      .then(() => message.success("Вы вийшли з акаунту", 3));
  };

  const logOut = () => {
    exit();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("nextauth.message");
    setTimeout(() => {
      router.reload();
    }, 2500);
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Увага`,
      description: "Це ми ще не доробили :)",
      placement,
    });
  };

  const { Content, Footer, Sider } = Layout;

  const [item, setItem] = useState();

  useEffect(() => {
    setItem(localStorage.token);
  }, []);

  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(localStorage.username);
  }, []);

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
            <Menu defaultSelectedKeys={["1"]} mode="vertical" theme={theme}>
              <Menu.Item key={1}>
                <Link href={"/"}>
                  <HomeOutlined />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Головна{" "}
                </Link>
              </Menu.Item>
              <Menu.Item
                key={3}
                onClick={() => openNotification("bottomRight")}
              >
                <UserOutlined />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Профіль{" "}
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout className="site-layout">
            <div className="homepage_wrap">
              <div className="site-layout-background">
                <Menu
                  className="menuItems"
                  selectable={false}
                  theme={theme}
                  mode="horizontal"
                >
                  <div className="loggedIn">
                    <Menu.Item>
                      {`${localStorage.getItem("username")}`}&nbsp;&nbsp;&nbsp;
                      <Button
                        style={{ marginRight: 10 }}
                        type={type}
                        onClick={logOut}
                        icon={<LogoutOutlined />}
                      >
                        Вийти
                      </Button>
                    </Menu.Item>
                  </div>
                </Menu>
              </div>
              <Content
                className="site-layout-background"
                style={{
                  padding: 10,
                }}
              >
                <div className="wrap_home">
                  <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 52 }}
                    justify="space-around"
                  >
                    <Col span={24}>
                      <div className="img_carousel">
                        <Carousel autoplay effect="fade">
                          <div>
                            <Image preview={false} src="3.webp" />
                          </div>
                          <div>
                            <Image preview={false} src="2.webp" />
                          </div>
                        </Carousel>
                      </div>
                    </Col>
                    <div className="loader">
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    </div>
                    <Map />
                  </Row>
                  <FloatButton.BackTop />
                </div>
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
      </>
    );
  else return <Main />;
};

export default Home;
