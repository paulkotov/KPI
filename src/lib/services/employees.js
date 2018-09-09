import { protocol, server, port } from '../config';

const token = window.localStorage.getItem('user');

async function loadEmplDataBy(id){
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

async function loadEmplDataFromDept(dept){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/worker/department/${dept}`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function loadEmplDataFromRecs(employeeId){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/worker/recruitments/${employeeId}`, {
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

async function fetchFullData(){
  let fetchedArray = [];
  let index=1;
  // let result=[];
  while (index > 0) {
    let data = await loadEmplDataBy(index);
    if (!!!data) break;
    fetchedArray.push(data);
    index++;
  }
  return fetchedArray.map(async (employee) => ({
    ...employee, 
    recruitment: await loadEmplDataFromRecs(employee.department_)
  }));
}

export { loadEmplDataBy, loadEmplDataFromDept, loadEmplDataFromRecs, addEmpl, fetchFullData };