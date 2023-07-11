export const fetchData = async body => {
  const url = 'https://3a37418b-8832-4f02-baa4-d1b850a92d70.mock.pstmn.io/graphql';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data
}