import { Client, ID, Storage, Databases, Query } from "appwrite";
import config from "../config/config.js";

export class BlogService {
    client = new Client();
    storage;
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.storage = new Storage(this.client);
        this.databases = new Databases(this.client);
    }

    // Post creation, deletion, updation, get methods

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userId
                }
            )
        } catch (error) {
            console.log("Blog service :: createPost error ", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }

            )
        } catch (error) {
            console.log("Blog service :: updatePost error ", error)
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
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
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
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

const blogService = new BlogService();
export default blogService
