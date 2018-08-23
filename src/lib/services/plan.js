import { protocol, server, port } from '../config';

const token = window.localStorage.getItem('user');

async function loadPlanData(){
  // const user = await store.dispatch(authActions.getCurrentUser);
  // const data = await getUser(user.userName, user.password);
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/plan`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function addPlan(plan){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/plan`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization' : token,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(plan)
  });
      
  const data = await response.json();
  return data;
}
  
async function delPlan(id){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/plan/${id}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      'Authorization' : token
    }
  });
        
  const data = await response.json();
  return data;
}

async function editPlan(id, plan){
  const response = await fetch(`https://${server}:${port}/api/v1/plan/${id}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Authorization' : token
    },
    body: JSON.stringify(plan)
  });
          
  const data = await response.json();
  return data;
}

export { loadPlanData, addPlan, delPlan, editPlan }; 