import CodeComponent from "../../CodeComponent";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
}
const BivariateBar = ({ fileName, col1, col2 }: Props) => {
  var code = `CHANGE DIS SHIT
    
    df = pd.read_csv("${fileName}")
    sns.boxplot(data=df, x="${col1}", y="${col2}", hue="${col1}")
    
    plt.legend(loc='upper right')
    plt.title('Box-plot')
    plt.show()`;

  return <CodeComponent codeString={code} />;
};

export default BivariateBar;
