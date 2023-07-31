import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
}

const TotalMissingCode = ({ fileName }: Props) => {
  const codeString = `import pandas as pd 
  
df = pd.read_csv("${fileName}") 
print("Missing Values per column:")
print(df.isnull().sum())`;

  return <CodeComponent codeString={codeString} />;
};

export default TotalMissingCode;
