import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const notFound: React.FC = () => {

  const router = useRouter();

 const handleOk = () => {
    setTimeout(() => {
        router.push('/');
      }, 2500)
 }

  return (
<div className='notFound'>
  <Result
    status="404"
    title="404"
    subTitle="Данной страницы не существует или она удалена"
    extra={<Button onClick={handleOk} type="primary">Вернуться на главную</Button>}
  />
</div>
)};

export default notFound;