import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
  column: string;
}

const BarGraphCode = ({ fileName, column }: Props) => {
  const code = `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("${fileName}")
data = df["${column}"].value_counts()

plt.bar(data.index, data.values)
plt.xlabel("${column}")
plt.ylabel("Frequency")
plt.title("Frequency Graph")

plt.show()
`;
  return <CodeComponent codeString={code} />;
};

export default BarGraphCode;
