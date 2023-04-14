import { EnumType } from "typescript";

export default interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  image_url: string;
  status: EnumType;
  categories: number[];
  attributes: number[];
  created_at: Date;
  updated_at: Date;
}
