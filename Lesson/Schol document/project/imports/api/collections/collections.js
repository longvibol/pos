import { Mongo } from "meteor/mongo";

export const Customer = new Mongo.Collection("customers");
export const Category = new Mongo.Collection("categories");
export const Item = new Mongo.Collection("items");
export const Supplier = new Mongo.Collection("suppliers");
export const Purchase = new Mongo.Collection("purchases");
export const Import = new Mongo.Collection("imports");
export const Export = new Mongo.Collection("exports");
