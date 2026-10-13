import mongoose from "mongoose";

interface contact {
    name: string;
    email: string;
    message: string;
    subject: string;
}

export const contactSchema = new mongoose.Schema<contact>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Contact = mongoose.model<contact>(
    "Contact",
    contactSchema
);
