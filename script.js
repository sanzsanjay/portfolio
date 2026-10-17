const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [], width = 0, height = 0, dpr = 1;
function resizeCanvas(){
  dpr = Math.min(window.devicePixelRatio || 1, 2); width = window.innerWidth; height = window.innerHeight;
  canvas.width = width * dpr; canvas.height = height * dpr; canvas.style.width = width+'px'; canvas.style.height = height+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const count = Math.min(65, Math.floor(width / 19));
  particles = Array.from({length:count},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.5+.4}));
}
function animate(){
  ctx.clearRect(0,0,width,height);
  for(let i=0;i<particles.length;i++){
    const p=particles[i]; p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>width)p.vx*=-1; if(p.y<0||p.y>height)p.vy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(135,220,208,.62)';ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const q=particles[j], dx=p.x-q.x,dy=p.y-q.y,dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<115){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(115,190,210,${(1-dist/115)*.11})`;ctx.lineWidth=.7;ctx.stroke();}
    }
  }
  requestAnimationFrame(animate);
}
resizeCanvas(); animate(); window.addEventListener('resize',resizeCanvas);
const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const menuToggle=document.getElementById('menuToggle'), nav=document.getElementById('nav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
