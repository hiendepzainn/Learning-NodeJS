const getCurrentTime = () => {
  const time = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};

export { getCurrentTime };
