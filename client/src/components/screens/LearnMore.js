import { useQuery } from "@apollo/client";
import Person from "../listItems/Person";
import { GET_PERSON } from "../../queries";
import { Card } from "antd";

const getStyles = () => ({
  card: {
    width: "100%"
  }
});

const LearnMore = props => {
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { id: props.id }
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(data.person);

  return (
    <>
      <Card
        title={
          <h1>
            {data.person.firstName} {data.person.lastName}'s Cars
          </h1>
        }
        style={styles.card}
      >
        <Person id={data.person.id} />
      </Card>
    </>
  );
};

export default LearnMore;
