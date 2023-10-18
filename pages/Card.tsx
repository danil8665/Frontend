import { Button, Card, Col, Image, Row } from "antd";
import Link from "next/link";

const { Meta } = Card;

interface Props {
  instance: {
    picture: string | null;
    manufacturer: string;
    name: string;
    price: number;
    _id: string;
  };
}

const MyCard: React.FC<Props> = ({ instance }) => {
  return (
    <>
      <Row justify={"space-around"}>
        <Col>
          <div className="card_style">
            <Card style={{ width: 300 }} hoverable>
              <div className="img_card">
                <Image width={250} src={`${instance?.picture}`} />
              </div>
              <Meta title={`${instance?.manufacturer}`} />
              <h3>{`${instance?.name}`}</h3>
              <div className="cardPrice">Ціна: {`${instance?.price}`} грн</div>
              <br />
              <br />
              <Link href="/api/about/[id].tsx" as={`/about/${instance?._id}`}>
                <Button type={"primary"}>Детальніше</Button>
              </Link>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MyCard;
