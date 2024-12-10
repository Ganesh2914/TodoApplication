async function random(){
    let res= await fetch("http://localhost:3001/todos")
  let json=await res.json();
  console.log(json)
}
random();