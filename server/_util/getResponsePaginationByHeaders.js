export default resHeaders => {
  if (!resHeaders['x-wp-total'] || !resHeaders['x-wp-totalpages']) {
    return null;
  }
  return {
    totalItems: parseInt(resHeaders['x-wp-total'], 10),
    totalPages: parseInt(resHeaders['x-wp-totalpages'], 10),
  };
};
