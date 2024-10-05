import { Client, Databases } from "appwrite";

const client = new Client();

export const PROJECT_ID = `66ff8bfa00336d19e55a`;

export const DATABASE_ID = `66ff8cfc001bbda94f7b`;

export const COLLECTION_MESSAGES_ID = `66ff8d18001b3337f748`;

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66ff8bfa00336d19e55a");

export const databases = new Databases(client);
