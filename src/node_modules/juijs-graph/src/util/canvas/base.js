export default {
    name: "util.canvas.base",
    extend: null,
    component: function () {
        const CanvasBase = function (context) {
            this.clearContext = function() {
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            }

            this.drawLine = function(
                x1,
                y1,
                x2,
                y2,
                color,
                lineWidth = 1,
            ) {
                color = color || '#434d6b';
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.lineWidth = lineWidth;
                context.strokeStyle = color;
                context.stroke();
            }

            this.drawCurve = function(
                points,
                minY,
                maxY,
                tension=0.5,
                isClosed=false,
                numOfSegments=16
            ) {
                context.beginPath();
                const pts = points.reduce((prev, e) => {
                    prev.push(e[0], e[1])
                    return prev;
                }, []);
                const ptsa = getCurvePoints(pts, minY, maxY, tension, isClosed, numOfSegments);
                context.moveTo(ptsa[0], ptsa[1]);
                for (let i = 2; i < ptsa.length - 1; i += 2)
                    context.lineTo(ptsa[i], ptsa[i + 1]);
            }

            this.drawDashedLine = function(
                x1,
                y1,
                x2,
                y2,
                color,
                dash=[3, 3],
                lineWidth=1,
            ) {
                color = color || '#434d6b';
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.lineWidth = lineWidth;
                context.strokeStyle = color;
                const originDash = context.getLineDash();
                context.setLineDash(dash);
                context.stroke();
                context.setLineDash(originDash);
            }

            this.drawLines = function(
                color,
                ...pos
            ) {
                color = color || '#434d6b';
                context.beginPath();
                context.moveTo(pos[0][0], pos[0][1]);
                pos.slice(1).map(e => context.lineTo(e[0], e[1]));
                context.lineWidth = 1;
                context.strokeStyle = color;
                context.stroke();
            }

            this.drawRoundRect = function(
                x,
                y,
                width,
                height,
                radius,
            ) {
                context.beginPath();
                context.moveTo(x, y + radius);

                // left line
                context.lineTo(x, y + height - radius);
                context.arcTo(
                    x, y + height,
                    x + radius, y + height,
                    radius,
                );

                // bottom line
                context.lineTo(x + width - radius, y + height);
                context.arcTo(
                    x + width, y + height,
                    x + width, y + height - radius,
                    radius,
                );

                // right line
                context.lineTo(x + width, y + radius);
                context.arcTo(
                    x + width, y,
                    x + width - radius, y,
                    radius,
                );

                // top line
                context.lineTo(x + radius, y);
                context.arcTo(
                    x, y,
                    x, y + radius,
                    radius,
                );

                context.closePath();
            }

            this.drawFreeRect = function(
                x1,
                y1,
                x2,
                y2,
                x3,
                y3,
                x4,
                y4,
                color,
                borderColor=null
            ) {
                color = color || '#ffffff'
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.lineTo(x3, y3);
                context.lineTo(x4, y4);
                context.closePath();
                context.fillStyle = color;
                if(borderColor != null) {
                    context.lineWidth = 2;
                    context.strokeStyle = borderColor;
                    context.stroke();
                }
                context.fill();
            }

            this.drawFreeRectStroke = function(
                x1,
                y1,
                x2,
                y2,
                x3,
                y3,
                x4,
                y4,
                color
            ) {
                color = color || '#ffffff'
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.lineTo(x3, y3);
                context.lineTo(x4, y4);
                context.lineWidth = 1;
                context.strokeStyle = color;
                context.stroke();
            }

            this.drawTriangle = function(
                x1,
                y1,
                d,
                color
            ) {
                color = color || '#ffffff'
                context.beginPath();
                context.moveTo(x1, y1 - d);
                context.lineTo(x1 - d, y1 + d);
                context.lineTo(x1 + d, y1 + d);
                context.closePath();
                context.fillStyle = color;
                context.fill();
            }

            this.drawSquare = function(
                x1,
                y1,
                d,
                color,
            ) {
                color = color || '#ffffff'
                context.beginPath();
                context.moveTo(x1 - d, y1 - d);
                context.lineTo(x1 - d, y1 + d);
                context.lineTo(x1 + d, y1 + d);
                context.lineTo(x1 + d, y1 - d);
                context.closePath();
                context.fillStyle = color;
                context.fill();
            }

            this.drawPage = function(
                value,
                x1,
                y1,
                color,
                border=false
            ) {
                drawFreeRect(
                    context,
                    value + x1, y1,
                    value + x1 - 20, y1 + 14,
                    value + x1 - 20, y1 + 52,
                    value + x1, y1 + 38,
                    color,
                    border ? 'rgba(255,255,255,0.2)' : null,
                );
            }

            this.drawCircle = function(
                x,
                y,
                d,
                color
            ) {
                color = color || 'white';
                d =  d || 1;
                context.beginPath();
                context.arc(x, y, d, 0, 2*Math.PI);
                context.fillStyle = color;
                context.fill()
            }

            this.drawBullet = function(
                x,
                y,
                width=74
            ) {
                let grd = context.createLinearGradient(x, y, x + width, y);
                grd.addColorStop(0, '#1074fc');
                grd.addColorStop(1, 'rgba(37, 172, 254, 0)');

                context.beginPath();
                context.arc(x, y, 2, Math.PI / 2, Math.PI / 2 * 3);
                context.lineTo(x + width, y - 2);
                context.lineTo(x + width, y + 2);
                context.closePath();
                context.fillStyle = grd;
                context.fill();
                context.fillStyle = grd;
            }

            this.getCurvePoints = function(pts, minY, maxY, tension=0.5, isClosed=false, numOfSegments=16) {
                var _pts = [], res = [],    // clone array
                    x, y,           // our x,y coords
                    t1x, t2x, t1y, t2y, // tension vectors
                    c1, c2, c3, c4,     // cardinal points
                    st, t, i;       // steps based on num. of segments

                // clone array so we don't change the original
                _pts = pts.slice(0);

                // The algorithm require a previous and next point to the actual point array.
                // Check if we will draw closed or open curve.
                // If closed, copy end points to beginning and first points to end
                // If open, duplicate first points to befinning, end points to end
                if (isClosed) {
                    _pts.unshift(pts[pts.length - 1]);
                    _pts.unshift(pts[pts.length - 2]);
                    _pts.unshift(pts[pts.length - 1]);
                    _pts.unshift(pts[pts.length - 2]);
                    _pts.push(pts[0]);
                    _pts.push(pts[1]);
                }
                else {
                    _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
                    _pts.unshift(pts[0]);
                    _pts.push(pts[pts.length - 2]); //copy last point and append
                    _pts.push(pts[pts.length - 1]);
                }

                // ok, lets start..

                // 1. loop goes through point array
                // 2. loop goes through each segment between the 2 pts + 1e point before and after
                for (i = 2; i < (_pts.length - 4); i += 2) {
                    for (t = 0; t <= numOfSegments; t++) {

                        // calc tension vectors
                        t1x = (_pts[i + 2] - _pts[i - 2]) * tension;
                        t2x = (_pts[i + 4] - _pts[i]) * tension;

                        t1y = (_pts[i + 3] - _pts[i - 1]) * tension;
                        t2y = (_pts[i + 5] - _pts[i + 1]) * tension;

                        // calc step
                        st = t / numOfSegments;

                        // calc cardinals
                        c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
                        c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
                        c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
                        c4 = Math.pow(st, 3) - Math.pow(st, 2);

                        // calc x and y cords with common control vectors
                        x = c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x;
                        y = c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y;

                        //store points in array
                        res.push(x);
                        if (y > maxY) res.push(maxY);
                        else if(y < minY) res.push(minY)
                        else res.push(y);
                    }
                }

                return res;
            }

        }

        return CanvasBase;
    }
}