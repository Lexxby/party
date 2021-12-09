const Qualite = (qualities) => {
  const usersQualities = qualities.map((a) => {
    const colorName = `badge bg-${a.color} m-2`;
    return <span className={colorName}>{a.name}</span>;
  });
  return usersQualities;
};
export default Qualite;
