import { List, Divider } from "antd";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import Car from "../listItems/Car";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center"
  }
});

const People = props => {
  const { ownerId } = props;
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <List style={styles.list}>
        {data.cars.map(({ id, year, make, model, price, personId }) =>
          personId === ownerId ? (
            <List.Item key={id}>
              <Car
                id={id}
                year={year}
                make={make}
                model={model}
                price={price}
                personId={personId}
              />
            </List.Item>
          ) : (
            <></>
          )
        )}
      </List>
    </>
  );
};

export default People;
