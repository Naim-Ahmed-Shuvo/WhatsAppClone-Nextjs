const getRecipientEmail = (users, user) =>
  users?.filter((userToFilter) => userToFilter.email !== user?.email)[0];

export default getRecipientEmail;