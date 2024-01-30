import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setEndpoint(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, username, password}){
        try {
            const user = await this.account.create(ID.unique(), email, password, username)

            if(user) {
                return this.login(email, password)
            } else {
                return user
            }

        }
        catch(error) {
            console.log("Appwrite service :: createAccount error ", error)
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        }
        catch(error) {
            console.log("Appwrite service :: login error ", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser error ", error)
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout error ", error);
        }
    }

}

const authService = new AuthService();

export default authService