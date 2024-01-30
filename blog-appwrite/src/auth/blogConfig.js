import { Client, ID, Storage, Databases, Query } from "appwrite";
import config from "../config/config";

export class BlogService {
    client = new Client();
    storage;
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setEndpoint(config.appwriteProjectId)

        this.storage = new Storage(this.client);
        this.databases = new Databases(this.client);
    }

    // Post creation, deletion, updation, get methods

    async createPost({title, slug, content, featureImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featureImage,
                    userId
                }
            )
        } catch (error) {
            console.log("Blog service :: createPost error ", error)
        }
    }

    async updatePost(slug, {title, content, featureImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }

            )
        } catch (error) {
            console.log("Blog service :: updatePost error ", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Blog service :: deletePost error ", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Blog service :: getPost error ", error)
        }
    }

    async getAllPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Blog service :: getAllPosts error ", error)
        }
    }

    // File upload methods

    async uploadFile(file) {
        try {
            await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )

            return true;
        } catch (error) {
            console.log("Blog service :: uploadFile error ", error)
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Blog service :: deleteFile error ", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}
