import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
  column: string;
}

const PieChartCode = ({ column, fileName }: Props) => {
  const code = `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("${fileName}")
data = df["${column}"].value_counts()

plt.pie(data.values, labels = data.index)
plt.title("Pie Chart")
plt.show()`;
  return <CodeComponent codeString={code} />;
};

export default PieChartCode;
