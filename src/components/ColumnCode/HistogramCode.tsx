import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
  column: string;
}

const HistogramCode = ({ fileName, column }: Props) => {
  const code = `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("${fileName}")
data = df["${column}"]
b = round((data.max() - data.min()) * ((data.size**0.3) / (3.49*data.std())))

plt.hist(data, bins=b)
plt.xlabel("${column}")
plt.ylabel("Frequency")
plt.title("Histogram")

plt.show()
`;
  return <CodeComponent codeString={code} />;
};

export default HistogramCode;
