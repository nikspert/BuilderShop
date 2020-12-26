

export function getItems(){
  return fetch("http://localhost:5000/api/v1/items")
    .then(res => res.json())
}
  
export async function createItem(data,Bearer){
  const response = await fetch("http://localhost:5000/api/v1/items", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Bearer           
    },
    body: JSON.stringify(data) 
  });
  return await response.json(); 
}
    
  
