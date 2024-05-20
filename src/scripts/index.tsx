import "../css/style.css";

import React from "react";
import { createRoot } from "react-dom/client";

let x = 400;
let y = 300;

let prevMouseX = 0;
let prevMouseY = 0;
let mouseX = 0;
let mouseY = 0;

let vx = 5;
let vy = 0;

let ax = 0;
let ay = 1;

let hue = 0;

let grabbed = false;

function Main() {
    return (
        <div className="environment" onMouseMove={(e) => {
            prevMouseX = mouseX;
            prevMouseY = mouseY;

            mouseX = e.clientX - 50;
            mouseY = e.clientY - 50;
        }}>
            <div className="ball" onMouseUp={(e) => {
                grabbed = false;
                x = mouseX;
                vx = mouseX - prevMouseX;
                y = mouseY;
                vy = mouseY - prevMouseY;
            }} onMouseDown={(e) => {
                grabbed = true
                vx = 0;
                vy = 0;
            }} style={{
                left: grabbed ? mouseX : x,
                top: grabbed ? mouseY : y,
                filter: "hue-rotate(" + hue + "deg)"
            }} ></div>
        </div>
    )
}

let root = createRoot(document.getElementById("main"));
setInterval(() => {
    if (!grabbed) x += vx;
    if (x < 100 || x > 1200) {
        x = x < 300 ? 100 : 1200;
        hue += 5;
        vx *= -0.8;
    }

    if (!grabbed) y += vy;
    if (y > 600) {
        y = 600;
        hue += 5;
        vy *= -0.8;
    }

    if (!grabbed) vx += ax;
    if (!grabbed) vy += ay;

    root.render(Main());
}, 10);