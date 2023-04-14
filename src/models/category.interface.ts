import { EnumType } from "typescript";

export default interface Category {
  id?: number;
  name: string;
  parent_id?: number;
  description?: string;
  status: EnumType;
}
