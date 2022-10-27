import { useState } from "react";

import { Card, Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import DeletePerson from "../buttons/DeletePerson";
import EditPerson from "../forms/EditPerson";
import LearnMore from "../screens/LearnMore";
import Cars from "../lists/Cars";

const getStyles = () => ({
  card: {
    width: "100%"
  }
});

const Person = props => {
  const { id, firstName, lastName } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    setEditMode(prev => !prev);
  };

  return (
    <>
      {editMode ? (
        <EditPerson
          onButtonClick={handleButtonClick}
          id={id}
          firstName={firstName}
          lastName={lastName}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <DeletePerson id={id} firstName={firstName} lastName={lastName} />
          ]}
        >
          {firstName} {lastName}
          <Cars ownerId={id} />
          <Button type="link" onClick={showModal}>
            Learn More
          </Button>
          <Modal
            open={isOpen}
            width="100%"
            onClose={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>
            ]}
          >
            <LearnMore id={id} />
          </Modal>
        </Card>
      )}
    </>
  );
};

export default Person;
