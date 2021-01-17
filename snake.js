function creatPoints(N, L, x, y) {
  const points = [];

  let tmpY = y;

  for (let i = 0; i < N; i += 1) {
    points.push({ x, y: tmpY });
    // tmpY += L;
  }

  return points;
}

function linkConstraint(points, L) {
  // head is unchanged
  const newPoints = [points[0]];
  for (let i = 1; i < points.length; i += 1) {
    // satisfy distance constraint here
    const a = newPoints[i - 1];
    const b = points[i];
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.hypot(dx, dy);
    const vba = { x: dx / distance, y: dy / distance };
    const x = a.x - L * vba.x;
    const y = a.y - L * vba.y;
    newPoints.push({ x, y });
  }
  return newPoints;
}

function calculateWidth(index, points) {
    const maxWidth = 40;
    const minWidth = 1;

    const widthDiff = maxWidth - minWidth;
    const factor = index / (points.length - 1);
    return (maxWidth - factor * widthDiff) / maxWidth;
}

function createSnakeBody() {
    const head = { x: 50, y: 50 };
    const points = creatPoints(50, 0.4, head.x, head.y);
    let body = '';
    
    for(let i = 0; i < points.length; i += 1) {
        const width = calculateWidth(i, points);
        body += `<circle fill="green" cx=${points[i].x} cy=${points[i].y + (width * (i))} r=${width} stroke-width="0.1" />`;
    }

    return body;

}

function createSnakeHead(length, x, y) {
    const head = `
    <g>
     <rect width=${length} height=${length} rx=${x} ry=${y} >
        <circle fill="black" cx=${length/2} cy=${length/2} r="0.3" stroke="white" stroke-width="1"/>
        <circle fill="black" cx=${length/2} cy=${length/2} r="0.3" stroke="white" stroke-width="1" />
     </rect> 
    </g>`;
    return head;
}

function createSnake() {
    const ele = document.getElementsByTagName("body");
    ele[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <g>
          ${createSnakeBody()}
      </g>
  </svg>`;
  }
  

function moveSnake() {}

createSnake();
