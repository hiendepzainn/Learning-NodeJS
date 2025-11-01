import * as z from "zod";

export const ProductSchema = z.object({
  name: z.string().trim().min(1, "'Name' phải có ít nhất 1 ký tự"),
  price: z.number().min(1, "'price' phải lớn hơn 0"),
  detailDesc: z.string().trim().min(1, "'detailDesc' phải có ít nhất 1 ký tự"),
  shortDesc: z.string().trim().min(1, "'shortDesc' phải có ít nhất 1 ký tự"),
  quantity: z.number().min(1, "'quantity' phải lớn hơn 0"),
  target: z.string().trim().min(1, "'target' phải có ít nhất 1 ký tự"),
  factory: z.string().trim().min(1, "'factory' phải có ít nhất 1 ký tự"),

  //     id         Int     @id @default(autoincrement())
  //   name       String  @db.VarChar(255)
  //   price      Int
  //   image      String? @db.VarChar(255)
  //   detailDesc String? @db.VarChar(255)
  //   shortDesc  String? @db.VarChar(255)
  //   quantity   Int
  //   sold       String? @db.VarChar(255)
  //   target     String? @db.VarChar(255)
  //   factory    String? @db.VarChar(255)
});

export type TProductSchema = z.infer<typeof ProductSchema>;
