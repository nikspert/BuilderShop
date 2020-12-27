
export async function SignIn(data){
    
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) 
    });
    return await response.json(); 
}


export async function SignUp(data){

  const response = await fetch("http://localhost:5000/api/v1/auth/register", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data) 
  });
  return await response.json(); 
}

