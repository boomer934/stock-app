import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "Stock Alerts",
    eventKey:process.env.INNGEST_EVENT_KEY,
});