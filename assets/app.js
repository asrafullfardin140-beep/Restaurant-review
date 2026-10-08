const businesses = {
 'chef-kebab-pizza': {name:'Chef Kebab Pizza', initials:'CK', kind:'KEBAB · PIZZA · GOOD TIMES', accent:'#b43a20', pale:'#fff0e7', url:'https://g.page/r/CQt20y9vXA8eEAE/review'},
 'the-house-pizza': {name:'The House Pizza', initials:'HP', kind:'PIZZA · FRESH FROM THE OVEN', accent:'#24563f', pale:'#edf4e9', url:'https://g.page/r/CfFbbNsQgDtBEAE/review'},
 'pizza-point-newcastle-west': {name:'Pizza Point', location:'Newcastle West', initials:'PP', kind:'YOUR LOCAL PIZZA SPOT', accent:'#a52c32', pale:'#fff0eb', url:'https://g.page/r/CTvcpSOB-TVmEAE/review'},
 'pizza-point-askeaton': {name:'Pizza Point', location:'Askeaton', initials:'PP', kind:'YOUR LOCAL PIZZA SPOT', accent:'#a52c32', pale:'#fff0eb', url:'https://g.page/r/CSO5Sn8IXkk2EAE/review'}
};
const slug = location.pathname.split('/').filter(Boolean)[0];
const b = businesses[slug];
const app = document.querySelector('main');
if (!b) {
 document.title = 'Restaurant Review';
 app.innerHTML = `<section class="card directory"><span class="eyebrow">A LITTLE FEEDBACK GOES A LONG WAY</span><h1>Your table.<br>Your say.</h1><p>Choose the restaurant you visited.</p><div class="restaurants">${Object.entries(businesses).map(([key,v])=>`<a href="/${key}/"><span class="mini" style="background:${v.accent}">${v.initials}</span><span>${v.name}${v.location ? `<small>${v.location}</small>`:''}</span><span class="arrow">↗</span></a>`).join('')}</div></section>`;
} else {
 document.title = `${b.name}${b.location ? ' '+b.location : ''} | How was your meal?`;
 document.documentElement.style.setProperty('--accent', b.accent);
 document.documentElement.style.setProperty('--pale', b.pale);
 app.innerHTML = `<header><div class="logo" aria-hidden="true">${b.initials}</div><div class="business">${b.name}</div>${b.location ? `<div class="location">${b.location}</div>`:''}<div class="eyebrow">${b.kind}</div></header><section class="card"><div class="plate" aria-hidden="true">✦</div><div id="rating-view"><span class="eyebrow">THANK YOU FOR DINING WITH US</span><h1>How was<br>your meal?</h1><p>Your feedback helps us make<br>every visit a little better.</p><div class="stars" role="group" aria-label="Rate your experience from 1 to 5 stars">${[1,2,3,4,5].map(n=>`<button class="star" aria-label="${n} star${n>1?'s':''}" data-rating="${n}">★</button>`).join('')}</div><div class="scale"><span>Could be better</span><span>Loved it!</span></div><div class="hint">Tap a star to share your experience</div></div><div id="feedback-view" hidden><span class="eyebrow">WE’RE LISTENING</span><h1>We’re sorry<br>we missed the mark.</h1><p>Tell us what happened so we can improve your next visit.</p><form><label for="guest">Your name <span>(optional)</span></label><input id="guest" name="name" maxlength="100" autocomplete="name" placeholder="Your name"><label for="feedback">What could we do better? <span>(optional)</span></label><textarea id="feedback" name="feedback" maxlength="3000" rows="4" placeholder="Tell us about your experience…"></textarea><p class="notice">Private feedback delivery is being set up. This form cannot send feedback yet.</p><button class="primary" type="submit" disabled>Send private feedback</button></form><button class="back" type="button">← Change my rating</button></div><div id="redirect-view" hidden><span class="eyebrow">THANK YOU FOR YOUR FEEDBACK</span><h1>Share your<br>experience.</h1><p>Opening Google Reviews…</p><a class="primary" href="${b.url}">Continue to Google Reviews ↗</a><button class="back" type="button">← Change my rating</button></div></section><footer>Made with care. Served with gratitude.<br><span>${b.name}${b.location ? ' · '+b.location : ''}</span></footer>`;
 let timer;
 function show(id) { ['rating-view','feedback-view','redirect-view'].forEach(v=>document.getElementById(v).hidden=v!==id); }
 document.querySelectorAll('.star').forEach(btn=>{
  btn.addEventListener('mouseenter',()=>highlight(+btn.dataset.rating));
  btn.addEventListener('focus',()=>highlight(+btn.dataset.rating));
  btn.addEventListener('click',()=>{
   const rating=+btn.dataset.rating;
   show(rating<=2?'feedback-view':'redirect-view');
   if(rating>=3) timer=setTimeout(()=>location.assign(b.url),1100);
   else document.querySelector('#guest').focus();
  });
 });
 function highlight(n){document.querySelectorAll('.star').forEach(el=>el.classList.toggle('lit',+el.dataset.rating<=n));}
 document.querySelector('.stars').addEventListener('mouseleave',()=>highlight(0));
 document.querySelectorAll('.back').forEach(btn=>btn.addEventListener('click',()=>{clearTimeout(timer);show('rating-view');highlight(0);document.querySelector('.star').focus();}));
 document.querySelector('form').addEventListener('submit',e=>e.preventDefault());
}
