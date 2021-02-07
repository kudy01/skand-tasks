export const fetchData = async () => {
  try {
    const response = await fetch('/api/v2/users', { 
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            Authorization: localStorage.getItem('token')
          }
        }) 
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};