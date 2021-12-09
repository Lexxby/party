const SearchStatus = (number) => {
  if ((number % 10 === 2 || number % 10 === 3 || number % 10 === 4) && (number < 10 || number > 20)) {
    return `${number} человека тусанет с тобой сегодня`;
  } else {
    return `${number} человек тусанет с тобой сегодня`;
  }
};
export default SearchStatus;
