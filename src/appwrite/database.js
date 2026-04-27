import config from "../config/config";
import { Client, Databases, Query, TablesDB } from "appwrite";

export class DatabaseService {
    client = new Client();
    tablesDB;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.createRow(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch (error) {
            console.log("Appwrite Database service :: createPost ", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.tablesDB.updateRow(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch (error) {
            console.log("Appwrite Database Service :: updatePost ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        }
        catch (error) {
            console.log("Appwrite Database Service :: deletePost ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        }
        catch (error) {
            console.log("Appwrite Database Service :: getPost ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.tablesDB.listRows(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query
            )
        }
        catch (error) {
            console.log("Appwrite Database Service :: getPosts ", error);
            return false;
        }
    }
}

const dbService = new DatabaseService();
export default dbService;