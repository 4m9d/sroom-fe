export default function getHeaders(){
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "*/*");
  
  return headers;
}