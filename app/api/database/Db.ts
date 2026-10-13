import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export const db = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI as string);
        if (!connect) {
            console.log("Mongoos connected error");

        }
        return connect;
    }
    catch (error) {
        console.log(error);

    }
}