import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
  column: string;
}

const OutlierCode = ({ fileName, column }: Props) => {
  const code = `import pandas as pd
import numpy as np

df = pd.read_csv('${fileName}')

Q1 = df['${column}'].quantile(0.25)
Q3 = df['${column}'].quantile(0.75)
IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

outliers = df[(df['${column}'] < lower_bound) | (df['${column}'] > upper_bound)]

print("Number of outliers in '${column}' column:", len(outliers))`;
  return <CodeComponent codeString={code} />;
};

export default OutlierCode;
