export const removeItemUndefine = (data: Object) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined || data[key] === data["id"]) {
      delete data[key];
    }
  });
  return data;
};
