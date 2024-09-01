import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./app/configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://build-form_owner:Ux2DdN7IpsnX@ep-lingering-snow-a53w0ngy.us-east-2.aws.neon.tech/build-form?sslmode=require'
  }
});