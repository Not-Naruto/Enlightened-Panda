import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
  values: string[];
}

const BivariateHistogram = ({ fileName, col1, col2, values }: Props) => {
  var code = `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("${fileName}")
`;

  for (let i = 0; i < values.length; i++) {
    code += `
plt.hist(df[df["${col1}"] == "${values[i]}"]["${col2}"], alpha = 0.5, label = "${values[i]}")`;
  }

  code += `\n\nplt.legend(loc="upper right")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.title("Histogram")
plt.show()`;

  return <CodeComponent codeString={code} />;
};

export default BivariateHistogram;
