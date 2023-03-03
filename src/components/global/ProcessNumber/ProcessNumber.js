export const CalculateTotalPage = (itemCount, limit) => {
  const totalPage = itemCount / limit;
  console.log(Math.ceil(totalPage));
  return Math.ceil(totalPage);
};
