import { IChildernProps } from "../../types/types";

function ViewError({ children }: IChildernProps) {
  return <h1>Error: {children}</h1>;
}

export default ViewError;
