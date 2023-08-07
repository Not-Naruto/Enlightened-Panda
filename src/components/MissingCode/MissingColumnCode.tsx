import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
  column: string;
}

const MissingColumnCode = ({ fileName, column }: Props) => {
  const codeString = `import pandas as pd 
  
df = pd.read_csv("${fileName}") 
print("Missing Values:", df["${column}"].isna().sum())`;

  return <CodeComponent codeString={codeString} />;
};

export default MissingColumnCode;
