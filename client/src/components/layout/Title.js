import { Divider } from "antd";

const getStyles = () => ({
  title: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold"
  }
});

const Title = () => {
  const style = getStyles();

  return (
    <>
      <h1 style={style.title}>People and Their Cars</h1>
      <Divider style={{ margin: 10 }} />
    </>
  );
};

export default Title;
