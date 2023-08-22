import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
}
const BivariateLinePlot = ({ fileName, col1, col2 }: Props) => {
  var code = `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("${fileName}")
plt.plot(df["${col1}"], df["${col2}"])

plt.title("Scatter Plot")
plt.xlabel("${col1}")
plt.ylabel("${col2}")

plt.show()`;

  return <CodeComponent codeString={code} />;
};

export default BivariateLinePlot;
