import { NextRequest, NextResponse } from "next/server";
import { db } from "../database/Db";
import { Contact } from "@/app/Models/ContactS";

export async function POST(req: NextRequest) {
    try {
        const { name, email, message, subject } = await req.json();
        const connect = await db();
        if (connect) {
            console.log("database is connect");
        }
        if (!name || !email || !message || !subject) {
            return NextResponse.json({ error: "All fields are required", status: 400 })
        }

        const info: any = await Contact.create({ name, email, message, subject })
        info.save();
        return NextResponse.json({
            message: "Message sent successfully",
            status: 200
        }, info)
    } catch (error) {
        return NextResponse.json({
            error: "Internal server error",
            status: 500
        })
    }
}