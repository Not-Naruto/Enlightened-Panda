import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
}

const ContingencyTableCode = ({ fileName, col1, col2 }: Props) => {
  var code = `import pandas as pd

df = pd.read_csv("${fileName}")

pd.crosstab(index = df["${col1}"], columns = df["${col2}"])`;

  return <CodeComponent codeString={code} />;
};

export default ContingencyTableCode;
