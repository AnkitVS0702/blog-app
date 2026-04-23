import { Client, Storage, ID } from "appwrite";
import config from "../config/config";

export class StorageService {

    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.storage = new Storage(client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch (error) {
            console.log("Appwrite Storage Service :: uploadFile ", error);
            return false;
        }
    }

    async deleteFile(fileID) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileID
            )
            return true;
        }
        catch (error) {
            console.log("Appwrite Storage Service :: deleteFile ", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }// it is fast operation . so we don't use async.

}

const storageServive = new StorageService();
export default storageService;