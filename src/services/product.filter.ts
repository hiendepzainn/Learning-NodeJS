import { prisma } from "../config/client";

const getProductsFilter = async (
  page: number,
  pageSize: number,
  factory: string,
  target: string,
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

  //target
  if (target !== "undefined") {
    const listTarget = target.split(",");
    where.target = {};
    where.target.in = listTarget;
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
  if (sort !== "undefined" && sort !== "none") {
    orderBy.price = sort;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const count = await prisma.product.count({
    where,
  });

  return {
    data: products,
    count: count,
  };
};

const buildQuery = (
  factory: string,
  target: string,
  price: string,
  sort: string
) => {
  let query: string = "";

  //factory
  if (factory !== "undefined") {
    const listFactory = factory.split(",");
    listFactory.forEach((item) => {
      query += `factory=${item}&`;
    });
  }

  //target
  if (target !== "undefined") {
    const listTarget = target.split(",");
    listTarget.forEach((item) => {
      query += `target=${item}&`;
    });
  }

  //price
  if (price !== "undefined") {
    const listPrice = price.split(",");
    listPrice.forEach((item) => {
      query += `price=${item}&`;
    });
  }

  query += `sort=${sort}&`;

  return query;
};

export { getProductsFilter, buildQuery };
