import {
  HomeOutlined,
  UserOutlined,
  InstagramOutlined,
  FacebookOutlined,
  LoadingOutlined,
  PlusOutlined,
  LoginOutlined,
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
import { ButtonType } from "antd/lib/button";
import Map from "./Map";
import { NotificationPlacement } from "antd/es/notification/interface";

const { Header, Sider, Content } = Layout;

const Main = () => {
  const [api, contextHolder2] = notification.useNotification();
  const [collapsed, setCollapsed] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();

  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [type, setType] = useState<ButtonType>("primary");

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Внимание`,
      description: "Сначала войдите в аккаунт",
      placement,
    });
  };

  const { Content, Footer, Sider } = Layout;

  const [item, setItem] = useState();

  useEffect(() => {
    setItem(localStorage.token);
  }, []);

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
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Головна
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Link>
            </Menu.Item>
            <Menu.Item key={3} onClick={() => openNotification("bottomRight")}>
              <UserOutlined />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Профіль
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                <div className="login">
                  <Menu.Item>
                    <Link href={"/login"}>
                      <Button type={type} icon={<LoginOutlined />}>
                        Вхід
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
                        Реєстрація
                      </Button>
                    </Link>
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

                  <FloatButton.BackTop />
                </Row>
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
};

export default Main;
