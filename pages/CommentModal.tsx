import React from "react";
import { Button, Modal } from "antd";

const countDown = () => {
  let secondsToGo = 5;

  const modal = Modal.success({
    title: "Дякуємо що залишили відгук!",
    content: `Це вікно закриється через ${secondsToGo} секунд.`,
  });

  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `Це вікно закриється через ${secondsToGo} секунд.`,
    });
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};

const CommentModal: React.FC = () => (
  <Button type="primary" htmlType="submit" onClick={countDown}>
    Відправити
  </Button>
);

export default CommentModal;
