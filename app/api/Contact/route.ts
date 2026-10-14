
import { NextRequest, NextResponse } from "next/server";
import { db } from "../database/Db";
import { Contact } from "@/app/Models/ContactS";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { name, email, message, subject } = await req.json();

        if (!name || !email || !message || !subject) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        await db();

        const info = await Contact.create({
            name,
            email,
            message,
            subject,
        });

        try {
            const response = await axios.post(
                "http://localhost:5001/notify-contact",
                {
                    name: info.name,
                    email: info.email,
                    subject: info.subject,
                    message: info.message,
                },

            );

            if (!response) {
                console.error("Notification delivery failed");
            }
        } catch (error) {
            console.error("Socket notification server unavailable", error);
        }

        return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact API error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}