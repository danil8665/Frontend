import { Col, List, Pagination, Row, Table } from 'antd';
import React, { FC, use } from 'react'
import {useState, useEffect} from 'react'
import MyCard from './Card';

interface Props {
    props: any;
}

export const Map:FC = () => {

    const [loading, setLoading] = useState(false);

    const [instance, setInstance] = useState([]);
    useEffect(() => {
        fetch(`https://blooming-journey-76324.herokuapp.com/products`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setInstance(data);
            })
        }, []);
    
    
    console.log(instance)

    const [posts, setPosts] = useState([])
    const defaultState = {
        items: [],
        isFetching: true,
        pageSize: 4,
        perPage: 10,
        totalCount: 50
    }

    return (
        <>
       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='center'>
     
        <Col span={5}>
            
        </Col>
        <Col span={5}>

        </Col>
        <Col span={5}>
        
        </Col>
        <Col span={5}>
        
        </Col>  
        {instance.map((instance: any) => <MyCard key={1} instance={instance}/>) }  
       </Row>
        </>
    );
}

export default Map;

