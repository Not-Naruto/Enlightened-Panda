import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
  column: string;
}

const BoxPlotCode = ({ fileName, column }: Props) => {
  const code = `import pandas as pd
import matplotlib.pyplot as plt
  
df = pd.read_csv("${fileName}")

plt.boxplot(df["${column}"].dropna())
plt.title("Box-plot")
plt.show()
`;

  return <CodeComponent codeString={code} />;
};

export default BoxPlotCode;
