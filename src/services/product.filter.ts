import { prisma } from "../config/client";

const getProductsFilter = async (
  factory: string,
  price: string,
  sort: string
) => {
  const where = {} as any;
  const orderBy = {} as any;

  // factory
  if (factory !== "undefined") {
    const listFactory = factory.split(",");
    where.factory = {};
    where.factory.in = listFactory;
  }

  //price range
  if (price !== "undefined") {
    const ORarray = [];
    const listPrice = price.split(",");

    listPrice.forEach((item) => {
      switch (item) {
        case "duoi-10-trieu": {
          ORarray.push({
            price: {
              lte: 10000000,
            },
          });
          break;
        }
        case "10-toi-15-trieu": {
          ORarray.push({
            price: {
              gte: 10000000,
              lte: 15000000,
            },
          });
          break;
        }
        case "15-toi-25-trieu": {
          ORarray.push({
            price: {
              gte: 15000000,
              lte: 25000000,
            },
          });
          break;
        }
        case "tren-25-trieu": {
          ORarray.push({
            price: {
              gte: 25000000,
            },
          });
          break;
        }
      }
    });

    where.OR = ORarray;
  }

  //sort
  if (sort !== "undefined") {
    orderBy.price = sort;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  return products;
};

export { getProductsFilter };
