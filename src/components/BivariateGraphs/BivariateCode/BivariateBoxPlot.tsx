import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
}

const BivariateBoxPlot = ({ fileName, col1, col2 }: Props) => {
  var code = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("${fileName}")
sns.boxplot(data=df, x="${col1}", y="${col2}", hue="${col1}")

plt.legend(loc='upper right')
plt.title('Box-plot')
plt.show()`;

  return <CodeComponent codeString={code} />;
};

export default BivariateBoxPlot;
