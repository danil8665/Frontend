import React from 'react';
import { Button, Modal } from 'antd';

const countDown = () => {

  let secondsToGo = 5;

  const modal = Modal.success({
    title: 'Спасибо что оставили отзыв!',
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

const CommentModal: React.FC = () => 

<Button type='primary' htmlType='submit' onClick={countDown}>Отправить</Button>;


export default CommentModal;