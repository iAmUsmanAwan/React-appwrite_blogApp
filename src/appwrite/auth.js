//**  start with appwrite auth service
//*   follow the steps in the documentation of Account/appwrite

import conf from "../conf/conf.js"
//? so that we can access the project ID and others

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        //* initialize the appwrite client with the project ID and URL from the conf file, as soon as the object of this class is created

        this.client
        .setEndpoint(conf.appwriteUrl)   //? our API end point
        .setProject(conf.appwriteProjectId);    // Project ID
        this.account = new Account(this.client)
        console.log("Account Initialized:", this.account); // Debug log
    }

    // TODO:
    async createAccount({email, password, name}){
        
        //* create a new user in appwrite, return the user object or error if something goes wrong, but as these things might take sometime hence we have created this method async

        //? note: this method does not handle the case where the email is already taken, we would need to add a check for that in the code

        console.log("Creating account with:", { email, password, name });
        try {
            const userAccount = await this.account.create(
                ID.unique(), 
                email, 
                password,
                name
            );     //? here we have used await because it is used instead of promise
            console.log("User account created:", userAccount);
            if (userAccount) {
                return this.login({email, password})  //? here we have called other method of the class 
            } else {
                return userAccount
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error
        }
    }

    // TODO:
    async login({email, password}){

        //* log in the user in appwrite, return the session object or error if something goes wrongs

        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Error during login:", error);
            throw error
        }
    }

    // TODO:
    async getCurrentUser(){

        //* get the current user from appwrite, return the user object or null if something goes wrong

        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: ", error);
        }
        return null
    }

    // TODO:
    async logout(){

        //* log out the user in appwrite, return true or error if something goes wrong

        try {
            await this.account.deleteSessions()    //? delete all sessions of the account
        } catch (error) {
            console.log("Appwrite service :: logout() :: ", error);
        }
    }
}



const authService = new AuthService()
//* here we have created a object of the class

export default authService