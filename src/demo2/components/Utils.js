import React from "react";

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {
    const statusChance = Math.random();
    return {
        id: Math.floor(Math.random() * 30),
        title: Math.floor(Math.random() * 30),
        content: Math.floor(Math.random() * 30),
    };
};

export function makeData(len = 5553) {
    return range(len).map(d => {
        return {
            ...newPerson(),
        };
    });
}
