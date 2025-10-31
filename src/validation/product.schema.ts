import * as z from "zod";

export const ProductSchema = z.object({
  name: z.string().trim().min(1),
  price: z.number().min(1),
  detailDesc: z.string().trim().min(1, "ngắn quá!"),
  shortDesc: z.string().trim().min(1),
  quantity: z.number().min(1),
  target: z.string().trim().min(1),
  factory: z.string().trim().min(1),

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
