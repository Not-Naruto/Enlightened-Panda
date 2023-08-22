import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
}
const BivariateStackedBar = ({ fileName, col1, col2 }: Props) => {
  var code = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("${fileName}")
cdf = df.groupby(["${col1}", "${col2}"]).size().reset_index().pivot(columns="${col2}", index="${col1}", values=0)

cdf.plot(kind="bar", stacked=True)
plt.legend(loc="upper right")
plt.show()`;

  return <CodeComponent codeString={code} />;
};

export default BivariateStackedBar;
