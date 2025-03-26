import { IChildrenProps } from "../../types/types";

function ViewError({ children }: IChildrenProps) {
  return <h1>Error: {children}</h1>;
}

export default ViewError;
