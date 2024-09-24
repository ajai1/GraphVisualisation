// Function to calculate distance between two points
export function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Function to select the point closer to (startX, startY)
export function selectClosestPoint(startX, startY, x1, y1, x2, y2) {
    const distance1 = distance(startX, startY, x1, y1);
    const distance2 = distance(startX, startY, x2, y2);

    if (distance1 < distance2) {
        return { x: x1, y: y1 };
    } else {
        return { x: x2, y: y2 };
    }
}



export function findIntersectionPoint(nodeRadius, startX, startY, endX, endY) {
    // Circle parameters
    const circleCenterX = endX;
    const circleCenterY = endY;
    const circleRadius = nodeRadius;
    // Step 1: Circle equation: (x - circleCenterX)^2 + (y - circleCenterY)^2 = circleRadius^2
    // Step 2: Line equation: y = mx + c
    // Calculate slope m
    const m = (endY - startY) / (endX - startX);

    // Calculate y-intercept c using one of the endpoints
    const c = startY - m * startX;

    // Coefficients of the quadratic equation ax^2 + bx + c = 0
    const a = 1 + m * m;
    const b = 2 * (m * (c - circleCenterY) - circleCenterX);
    const c1 = circleCenterX * circleCenterX + (c - circleCenterY) * (c - circleCenterY) - circleRadius * circleRadius;

    // Step 4: Solve the quadratic equation
    const discriminant = b * b - 4 * a * c1;

    if (discriminant < 0) {
        // No real solutions, line does not intersect the circle
        return null;
    } else if (discriminant === 0) {
        // One intersection point (tangent)
        const x = -b / (2 * a);
        const y = m * x + c;
        return { x, y };
    } else {
        // Two intersection points
        const sqrtDiscriminant = Math.sqrt(discriminant);
        let x1 = (-b + sqrtDiscriminant) / (2 * a);
        let x2 = (-b - sqrtDiscriminant) / (2 * a);
        let y1 = m * x1 + c;
        let y2 = m * x2 + c;
        return selectClosestPoint(startX, startY, x1, y1, x2, y2);
    }
}
