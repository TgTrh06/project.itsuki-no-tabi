import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

const ENDPOINT = process.env.MAILTRAP_ENDPOINT || "inbox.mailtrap.io";
const TOKEN = process.env.MAILTRAP_TOKEN || "8fac828f39b3a3366e47bc889adb29e1";

export const mailtrapClient = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Itsuki No Tabi",
};