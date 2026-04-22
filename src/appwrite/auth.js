import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        // this.client.setEndpoint(config.appwriteUrl)
        // this.client.setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    } // we want that whenver a new user/account is to be made then only it will be called. if we declare in class
    // then it will be wastage. So declared in constructor (whenever an object will be created)

    async createAccount({ name, email, password }) {
        try {
            const userAcc = await account.create(
                // {
                //     userId: ID.unique(),
                //     email: email,
                //     password: password
                // }
                ID.unique(), email, password, name
            );
            if (userAcc) {
                //if user successfully creates account we want to log in him 
                //  call another method
                return this.login({ email, password });
            } else {
                return userAcc;
            }
        }
        catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            return session;
        }
        catch (error) {
            throw error;
        }
    }

    async getCurrUser() {
        try {
            const usr = await this.account.get();
            return usr;
        }
        catch (error) {
            //throw error;
            //instead of just throwing error we can also customize the error
            console.log("Appwrite Authentication service :: getCurrUser", error);
        }
        return null;
    }

    async logOut() {
        try {
            const result = await account.deleteSessions();
            return result;
        }
        catch (error) {
            console.log("Appwrite Authentication service :: logOut", error);
        }
    }

}

const authservice = new AuthService();
export default authservice;