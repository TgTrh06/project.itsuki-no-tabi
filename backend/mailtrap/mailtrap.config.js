import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

const TOKEN = process.env.MAILTRAP_TOKEN || "40d36c6a11a7486c7af95cde46581d21";

export const mailtrapClient = new MailtrapClient({
    endpoint: "https://send.api.mailtrap.io/",
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Itsuki No Tabi",
};