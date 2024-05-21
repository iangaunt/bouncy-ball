import "../css/style.css";

import React, { useState } from "react";
import { createRoot } from "react-dom/client";

let x = 400;
let y = 300;

let vx = 5;
let vy = 0;

let ax = 0;
let ay = 1;

let prevMouseX = 0;
let prevMouseY = 0;
let mouseX = 0;
let mouseY = 0;

let retained = 0.8;

let hue = 0;

let grabbed = false;

let hidden = "";

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
            <div className="settings">
                <button className="toggle" onClick={() => {
                    hidden = hidden == "hidden" ? "" : "hidden"
                }}>x</button>

                <button className={hidden} onClick={() => {
                    ay = ay == 0 ? 1 : 0;
                }}>
                    gravity: <span >{ay == 0 ? "off" : "on"}</span>
                </button>
                <button className={hidden}>
                    retained E: <input type="number" onChange={(e) => {
                        retained = parseFloat(e.target.value);
                        if (retained < 0) retained = 0;
                    }}></input>
                </button>
            </div>
        </div>
    )
}

let root = createRoot(document.getElementById("main"));

setInterval(() => {
    if (!grabbed) x += vx;
    if (x < 0 || x > window.innerWidth - 100) {
        x = x < 50 ? 0 : window.innerWidth - 100;
        hue += 5;
        vx *= -retained;
    }

    if (!grabbed) y += vy;
    if (y < 0 || y > window.innerHeight - 100) {
        y = y < 50 ? 0 : window.innerHeight - 100;
        hue += 5;
        vy *= -retained;
    }

    if (!grabbed) vx += ax;
    if (!grabbed) vy += ay;

    root.render(Main());
}, 10);