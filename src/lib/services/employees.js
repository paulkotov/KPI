import { protocol, server, port } from '../config';

const token = window.localStorage.getItem('user');

async function loadEmplDataById(id){
    // const user = await store.dispatch(authActions.getCurrentUser);
    // const data = await getUser(user.userName, user.password);
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/worker/${id}`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function loadEmplDataFromDept(deptID){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/worker/department/${deptID}`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function loadEmplDataFromReqs(id){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/worker/recruitments/${id}`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function addEmpl(employee) {
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/worker`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization' : token,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(employee)
  });
  const data = await response.json();
  return data;
}

export { loadEmplDataById, loadEmplDataFromDept, loadEmplDataFromReqs, addEmpl };