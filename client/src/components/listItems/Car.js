import { useState } from "react";

import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditCar from "../forms/EditCar";
import DeleteCar from "../buttons/DeleteCar";

const getStyles = () => ({
  card: {
    width: "700px",
    backgroundColor: "#fafafa"
  }
});

const Car = props => {
  const { id, year, make, model, price, personId } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(prev => !prev);
  };

  return (
    <>
      {editMode ? (
        <EditCar
          onButtonClick={handleButtonClick}
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
        />
      ) : (
        <Card
          style={styles.card}
          size="small"
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <DeleteCar
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
            />
          ]}
        >
          {year} {make} {model} -> ${" "}
          {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Card>
      )}
    </>
  );
};

export default Car;
