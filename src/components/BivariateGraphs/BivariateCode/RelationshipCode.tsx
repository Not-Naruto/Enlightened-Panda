import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
}
const RelationshipCode = ({ fileName, col1, col2 }: Props) => {
  var code = `import pandas as pd
import numpy as np

df = pd.read_csv("${fileName}")[["${col1}", "${col2}"]].dropna()

covariance = df["${col2}"].cov(df["${col1}"])
correlation = df["${col2}"].corr(df["${col1}"])

print("Covariance:", covariance)
print("Correlation:", correlation)`;

  return <CodeComponent codeString={code} />;
};

export default RelationshipCode;
