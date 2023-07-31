import CodeComponent from "../CodeComponent";

interface Props {
  fileName: string;
}

const TotalMissingCode = ({ fileName }: Props) => {
  const codeString = `import pandas as pd 
  
df = pd.read_csv("${fileName}") 
missing = df.isnull().values.sum()
total = df.size

print(f"Total Missing Values: {missing}")
print(f"Percentage: {round((missing/total) * 100)}%")`;

  return <CodeComponent codeString={codeString} />;
};

export default TotalMissingCode;
