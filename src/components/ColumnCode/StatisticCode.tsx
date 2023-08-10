import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
  column: string;
}

const StatisticCode = ({ fileName, column }: Props) => {
  const code = `import pandas as pd
import statistics

df = pd.read_csv("${fileName}")
col = df["${column}"]

print("Mean:", col.mean())
print("Median:", col.median())
print("Mode:", statistics.mode(col))
print("Standard Deviation:", col.std())
print("Variance:", col.var())
`;

  return <CodeComponent codeString={code} />;
};

export default StatisticCode;
