import CodeComponent from "./CodeComponent";

interface Props {
  fileName: string;
}

const DataTypesCode = ({ fileName }: Props) => {
  const codeString = `import pandas as pd 
  
df = pd.read_csv("${fileName}") 
print(df.dtypes)`;

  return <CodeComponent codeString={codeString} />;
};

export default DataTypesCode;
