import getConnection from "../config/database";

const fs = require("fs/promises");

const regenerate = async () => {
  // Delete D:\chatbot\test-api-chatbot\index_storage
  await deleteIndex_Storage();

  // Delete knowledge.txt in D:\chatbot\test-api-chatbot\data
  await deleteKnowledge();

  // Export knowledge.txt in D:/chatbot/test-api-chatbot/data
  await exportKnowledge();
};

const deleteIndex_Storage = async () => {
  try {
    await fs.rm("D:/chatbot/test-api-chatbot/index_storage", {
      recursive: true,
      force: true,
    });
    console.log("Đã xóa thư mục");
  } catch (error) {
    console.error(error);
  }
};

const deleteKnowledge = async () => {
  try {
    await fs.unlink("D:/chatbot/test-api-chatbot/data/knowledge.txt");
    console.log("Đã xóa file");
  } catch (err) {
    console.error("Lỗi khi xóa file:", err);
  }
};

const exportKnowledge = async () => {
  const myConnection = await getConnection();

  try {
    await myConnection.query(
      `SELECT 
        CONCAT(
            'Sản phẩm ', name,
            ' có giá ', price,
            ' đồng, dành cho người có trình độ ', target,
            ' và là máy của hãng ', factory
        )
        FROM nodejspro.products
        INTO OUTFILE "D:/chatbot/test-api-chatbot/data/knowledge.txt"
        FIELDS TERMINATED BY ''
        LINES TERMINATED BY '\r\n';`
    );
    console.log("Export ok");
  } catch (error) {
    console.log("error:", error);
  }
};

export { regenerate };
