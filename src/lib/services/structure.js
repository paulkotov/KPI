import { protocol, server, port } from '../config';

const token = window.localStorage.getItem('user');

async function loadStructData(){
  // const user = await store.dispatch(authActions.getCurrentUser);
  // const data = await getUser(user.userName, user.password);
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/department`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function updateDept(dept){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/department`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization' : token,
      'Content-Type':'application/json' 
    },
    body: JSON.stringify(dept)
  });
    
  const data = await response.json();
  return data;
}

async function delDept(id){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/department/${id}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      'Authorization' : token
    }
  });
      
  const data = await response.json();
  return data;
}

export { loadStructData, updateDept, delDept }; 