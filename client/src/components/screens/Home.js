import "../../App.css";
import Title from "../layout/Title";
import AddPerson from "../forms/AddPerson";
import AddCar from "../forms/AddCar";
import People from "../lists/People";

const Home = props => {
  return (
    <div className="App">
      <Title />
      <AddPerson />
      <AddCar />
      <People />
    </div>
  );
};

export default Home;
