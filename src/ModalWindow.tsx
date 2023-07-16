import React, { FC } from "react";

const ModalWindow: FC<{ selectedDetail: string }> = ({ selectedDetail }) => {
  return (
    <div className={"detail"}>
      <div className={"detail__content"}>
        <div className={"detail__content__title"}>{selectedDetail}</div>
        <div className={"detail__content__description"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque
          consequatur deleniti doloribus enim est, id nihil odit pariatur
          perferendis placeat quaerat quasi, quidem quis quisquam quod
          repudiandae totam voluptatum?
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;