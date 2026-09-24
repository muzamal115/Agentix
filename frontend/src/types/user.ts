export interface User{
   userId: string;
    name: string;
    email: string;
    avatar: string;
    plan:string,
    credits:number,
    totalCredits:number,
    planExpiresAt:null | string 
}

export interface LoginResponse{
  user:User,
  message:string
}

export interface LogoutResponse{
    message:string
}