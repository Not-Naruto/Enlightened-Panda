import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
}
const BivariateBar = ({ fileName, col1, col2 }: Props) => {
  var code = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
    
df = pd.read_csv("${fileName}")

sns.countplot(data=df, x="${col1}", hue="${col2}")
plt.title('Count Plot')
plt.legend(loc='upper right')
plt.show()`;

  return <CodeComponent codeString={code} />;
};

export default BivariateBar;
