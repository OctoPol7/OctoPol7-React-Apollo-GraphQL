import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Button, Divider, InputNumber, Select } from "antd";
import { v4 as uuidv4 } from "uuid";

import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";

const Option = Select;

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);

  const [form] = Form.useForm();
  const [, forcedUpdate] = useState();

  useEffect(() => {
    forcedUpdate({});
  }, []);

  const onFinish = values => {
    const { year, make, model, price, personId } = values;

    console.log("year: ", year);
    console.log("make: ", make);
    console.log("model: ", model);
    console.log("price: ", price);
    console.log("personId: ", personId);

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar]
          }
        });
      }
    });
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Divider plain style={{ fontSize: 30, fontWeight: "bold" }}>
        Add Car
      </Divider>
      <Form
        form={form}
        name="add-car-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="year"
          label="Year:"
          rules={[{ required: true, message: "Please input the year!" }]}
        >
          <InputNumber parser={value => parseInt(value)} placeholder="Year" />
        </Form.Item>
        <Form.Item
          name="make"
          label="Make:"
          rules={[{ required: true, message: "Please input the make!" }]}
        >
          <Input placeholder="Make" />
        </Form.Item>
        <Form.Item
          name="model"
          label="Model:"
          rules={[{ required: true, message: "Please input the model!" }]}
        >
          <Input placeholder="Model" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price:"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={value => parseFloat(value.replace(/\$\s?|(,*)/g, ""))}
          />
        </Form.Item>
        <Form.Item
          name="personId"
          label="Person:"
          rules={[{ required: true, message: "Please input the owner!" }]}
        >
          <Select placeholder="Select a person" style={{ width: 120 }}>
            {data.people.map(({ id, firstName, lastName }) => (
              <Option key={id} value={id}>
                {firstName} {lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCar;
