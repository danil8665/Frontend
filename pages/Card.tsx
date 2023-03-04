import { Button, Card, Col, Image, Pagination, Rate, Row } from 'antd';
import { ButtonType } from 'antd/lib/button';
import { MenuTheme } from 'antd/lib/menu';
import { FetchEventResult } from 'next/dist/server/web/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const { Meta } = Card;

interface Props {
  instance: any;
}

const MyCard: React.FC<Props> = ({instance}) => {
  console.log(instance)
//   const [image, setImage] = useState("");
//   useEffect(() => {
//     fetch('http://localhost:3080/products')
//         .then((response) => {
//             return response.text();
//         })
//         .then((data) => {
//             setImage(data);
//         });
// }, []);

  return (
      <>
      <Row justify={'space-around'}>
        <Col>
      <div className='card_style'>
      <Card style={{ width: 300 }} hoverable>
        <div className="img_card">
          <Image
            width={250}
            src={`${instance.picture}`}
          />
        </div>
        <Meta
          title={`${instance.manufacturer}`}
          // description={`${instance.name}`}
        />
         <h3>{`${instance.name}`}</h3>
        <div className='cardPrice'>
        Цена: {`${instance.price}`} грн
        </div>
        <p>Оценка модели</p>
        <Rate disabled value={`${instance.rate}`} />
        <br/>
        <br/>
        <Link href="/api/about/[id].tsx" as={`/about/${instance._id}`}><Button type={'primary'}>Подробнее</Button></Link>
      </Card>
      </div>
      </Col>
      </Row>
      </>
  );
};

export default MyCard;

