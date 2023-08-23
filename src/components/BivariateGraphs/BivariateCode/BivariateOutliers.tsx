import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
}
const BivariateOutliers = ({ fileName, col1, col2 }: Props) => {
  var code = `import pandas as pd
import numpy as np
from scipy.stats import zscore

df = pd.read_csv("${fileName}")[["${col1}", "${col2}"]].dropna()
x = list(df["${col1}"])
y = list(df["${col2}"])
threshold = 2

bivariate_outliers = []

mean_x = sum(x) / len(x)
mean_y = sum(y) / len(y)

variance_x = sum((value - mean_x) ** 2 for value in x) / (len(x) - 1)
variance_y = sum((value - mean_y) ** 2 for value in y) / (len(y) - 1)

std_dev_x = variance_x ** 0.5
std_dev_y = variance_y ** 0.5

for i in range(len(x)):
    z_score_x = abs((x[i] - mean_x) / std_dev_x)
    z_score_y = abs((y[i] - mean_y) / std_dev_y)

    if z_score_x > threshold or z_score_y > threshold:
        bivariate_outliers.append((x[i], y[i]))
print('Outliers:', len(bivariate_outliers))
  `;

  return <CodeComponent codeString={code} />;
};

export default BivariateOutliers;
