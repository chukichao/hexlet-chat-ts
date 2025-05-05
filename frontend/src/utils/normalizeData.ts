/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */

export default (data) => {
  const entities = data.reduce((acc, n) => ((acc[n.id] = n), acc), {});
  const ids = Object.keys(entities);

  return { entities, ids };
};
