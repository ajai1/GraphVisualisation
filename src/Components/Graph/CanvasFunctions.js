import { findIntersectionPoint } from "./CanvasUtils";

export function drawNode(node, ctx) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI);
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = 'grey';
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = 'white'; // Set stroke color twhite
    ctx.font = "40px Arial";
    ctx.shadowColor = "rgba(0, 0, 0, 0)";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = 'white';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(node.label, node.x, node.y);
    ctx.closePath();
    if(node.isHighlighted){
        highlightNode(node, ctx);
    }
}

export function highlightNode(node, ctx) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'orange';
    ctx.stroke();
    ctx.closePath();
}

export const drawEdges = (fromX, fromY, toX, toY, ctx, directedGraph=false, isHighlighted='black') => {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.strokeStyle = isHighlighted;
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.closePath();
    const circleIntersectionPts = findIntersectionPoint(30, fromX, fromY, toX, toY);
    if(circleIntersectionPts && directedGraph){
        drawArrowHead(ctx, fromX, fromY, circleIntersectionPts.x, circleIntersectionPts.y);
    }
};


function drawArrowHead(ctx, fromX, fromY, toX, toY) {
    const headlen = 10; // length of head in pixels
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.fillStyle = 'black';
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(toX, toY);
    ctx.fill();
    ctx.closePath();
}



