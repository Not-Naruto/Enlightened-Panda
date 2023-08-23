import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
}

const GroupedStatistics = ({ fileName, col1, col2 }: Props) => {
  var code = `import pandas as pd

df = pd.read_csv("${fileName}")

col1 = "${col1}"
col2 = "${col2}"

groups = df[col1].drop_duplicates().dropna()

for i in groups:
  print("Mean:",  round(df[df[col1]==i][col2].mean(),2))
  print("Median:",  round(df[df[col1]==i][col2].median(),2))
  print("Mode:",  round(df[df[col1]==i][col2].mode()[0],2))
  print("Standard Deviation:",  round(df[df[col1]==i][col2].std(),2))
  print("Variance:",  round(df[df[col1]==i][col2].var(),2))
  print('')`;

  return <CodeComponent codeString={code} />;
};

export default GroupedStatistics;
