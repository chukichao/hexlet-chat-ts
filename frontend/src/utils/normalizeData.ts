// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (data: any[]) => {
  const entities = data.reduce((acc, n) => ((acc[n.id] = n), acc), {});
  const ids = Object.keys(entities);

  return { entities, ids };
};
