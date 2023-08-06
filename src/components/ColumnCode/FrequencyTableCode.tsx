import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
  column: string;
}

const FrequencyTableCode = ({ fileName, column }: Props) => {
  const code = `import pandas as pd
import matplotlib.pyplot as plt
  
df = pd.read_csv("${fileName}")
data = df["${column}"].value_counts()

print(data)`;
  return <CodeComponent codeString={code} />;
};

export default FrequencyTableCode;
