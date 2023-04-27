import { IChildernProps } from "../../types/types";

function ViewError(props: IChildernProps) {
  const { children } = props;
  return <h1>Error: {children}</h1>;
}

export default ViewError;
