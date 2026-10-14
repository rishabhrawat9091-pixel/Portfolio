import React from 'react'
import { io } from "socket.io-client";

export const notifysocket = io("http://localhost:5001", {
    autoConnect: false
})

