import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DELETE_CAR, GET_CARS } from "../../queries";
import filter from "lodash.filter";

const DeleteCar = ({ id, year, make, model, price }) => {
  const [deleteCar] = useMutation(DELETE_CAR, {
    update(cache, { data: { deleteCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, o => {
            return o.id !== deleteCar.id;
          })
        }
      });
    }
  });
  const handleButtonClick = () => {
    let result = window.confirm(`Are you sure you want to delete the ${year} ${make} ${model} ->
    $${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}?`);
    if (result) {
      deleteCar({
        variables: {
          id
        }
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default DeleteCar;
