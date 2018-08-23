import { protocol, server, port } from '../config';

const token = window.localStorage.getItem('user');

async function loadUsers(){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/user`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function addUser(user){
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/user`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization' : token,
      'Content-Type':'application/json' 
    },
    body: JSON.stringify(user)
  });
  
  const data = await response.json();
  return data;
}

async function delUser(id){
  return id;
}

function getUserInfo(str){
  return str.split(' ');   
}

export { loadUsers, addUser, delUser, getUserInfo };

