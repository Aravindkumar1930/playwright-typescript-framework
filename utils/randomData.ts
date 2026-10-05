export function generateRandomEmail (){
    const email = `user${Math.random().toString().slice(2,8)}@test.com`;
    
return email;
}
