import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';

const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#0E1116';
ctx.fillRect(0, 0, width, height);

const glow = ctx.createRadialGradient(180, 60, 0, 180, 60, 620);
glow.addColorStop(0, 'rgba(201,162,39,0.28)');
glow.addColorStop(1, 'rgba(201,162,39,0)');
ctx.fillStyle = glow;
ctx.fillRect(0, 0, width, height);

const glow2 = ctx.createRadialGradient(1080, 520, 0, 1080, 520, 500);
glow2.addColorStop(0, 'rgba(74,156,143,0.18)');
glow2.addColorStop(1, 'rgba(74,156,143,0)');
ctx.fillStyle = glow2;
ctx.fillRect(0, 0, width, height);

ctx.fillStyle = '#C9A227';
ctx.font = '600 26px sans-serif';
ctx.textBaseline = 'alphabetic';
ctx.fillText('P R O J E C T   M A N A G E R', 90, 170);

ctx.fillStyle = '#F1ECE0';
ctx.font = '600 96px Georgia, serif';
ctx.fillText('Александра', 90, 300);
ctx.fillText('Колыхалова', 90, 400);

ctx.strokeStyle = '#C9A227';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(90, 440);
ctx.lineTo(300, 440);
ctx.stroke();

ctx.fillStyle = '#B7B2A4';
ctx.font = '400 32px sans-serif';
ctx.fillText('Веду проекты и команды в аутсорс-разработке', 90, 500);
ctx.fillText('от постановки задачи до релиза', 90, 542);

const buffer = canvas.toBuffer('image/png');
writeFileSync(new URL('../public/og-image.png', import.meta.url), buffer);
console.log('written');
