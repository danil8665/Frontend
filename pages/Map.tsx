import { Col, Row } from "antd";
import React, { FC } from "react";
import { useState, useEffect } from "react";
import MyCard from "./Card";

export const Map: FC = () => {
  const [instance, setInstance] = useState([]);
  useEffect(() => {
    fetch(`https://backend-dixi-00461a80fa26.herokuapp.com/products`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInstance(data);
      });
  }, []);

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
        <Col span={5}></Col>
        <Col span={5}></Col>
        <Col span={5}></Col>
        <Col span={5}></Col>
        {instance.map((instance: any) => (
          <MyCard key={1} instance={instance} />
        ))}
      </Row>
    </>
  );
};

export default Map;
