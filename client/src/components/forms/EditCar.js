import { useState, useEffect } from "react";
import { Form, Button, Input, InputNumber, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_CAR, GET_PEOPLE } from "../../queries";

const Option = Select;

const EditPerson = props => {
  const { id, year, make, model, price, personId } = props;
  const [editPerson] = useMutation(EDIT_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    const { year, make, model, price, personId } = values;

    editPerson({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      }
    });

    props.onButtonClick();
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Form
      form={form}
      name="edit-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        id: id,
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId
      }}
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
            <Option value={id}>
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
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("firstName") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Done
          </Button>
        )}
      </Form.Item>
      <Button type="danger" onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default EditPerson;
