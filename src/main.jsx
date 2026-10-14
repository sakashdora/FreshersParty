import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowDown, ArrowRight, Menu, X, Play, Pause, Plus, Minus, CalendarDays, MapPin, Download, Copy, RotateCcw } from 'lucide-react';
import './styles.css';

const EVENT_DATE = '2026-10-30T10:30:00+05:30';
const eventTime = new Date(EVENT_DATE).getTime();
const INTRO_KEY = 'nirvahan-party-intro-v1';
const schedule = [
  ['10:30', 'AM', 'First hellos', 'Check in, find your friends, and get a photograph together.', 'Arrival & photographs'],
  ['11:15', 'AM', 'Let’s begin', 'A welcome from the people who will make this place feel like home.', 'Opening ceremony'],
  ['12:00', 'PM', 'Meet the main characters', 'Your batch takes the stage. Talent, a little friendly competition, and plenty of cheering.', 'Talent & fresher showcase'],
  ['01:30', 'PM', 'Pull up a chair', 'Good food tastes better with new friends. Save someone a seat.', 'Lunch & conversations'],
  ['FINALE', '', 'Just one more song', 'A dance floor, a final photograph, and the first of many stories.', 'Music & celebrations'],
];
const questions = [
  ['Who’s invited?', 'The new MCA batch, seniors, and faculty at Srusti Campus. Bring your college student ID, and check entry arrangements with your class representative.'],
  ['When and where is the party?', 'Friday, 30 October 2026 at Srusti Auditorium. Arrival starts at 10:30 AM IST. Your class announcements will have any final updates.'],
  ['What’s the dress code?', 'Ethnic or formal is the current theme: a kurta, saree, suit, or your favourite dressed-up look. Check the final dress code with your class representative.'],
  ['Can I take the stage?', 'Absolutely. Speak to your section representative before the event, or ask at the arrival desk about the talent showcase and Mr. & Ms. Fresher rounds.'],
  ['Is the downloadable invitation an entry pass?', 'It’s a personal keepsake, not a registration or entry pass. Your class representative can confirm attendance and entry details.'],
];
function remaining() {
  const t = Math.max(0, eventTime - Date.now());
  return [Math.floor(t / 86400000), Math.floor(t / 3600000) % 24, Math.floor(t / 60000) % 60, Math.floor(t / 1000) % 60];
}
function shouldShowIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try { return sessionStorage.getItem(INTRO_KEY) !== 'seen'; } catch { return true; }
}
function Mark() {
  return <svg viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M4 36V8l8-5 20 24V8l8-5v33l-8 5L12 17v19l-8 5z" fill="currentColor"/><path d="M32 8l8-5v33l-8 5z" fill="currentColor" opacity=".5"/></svg>;
}
function Brand() {
  return <a href="#home" className="brand" aria-label="Nirvahan home"><Mark/><span>nirvahan<span className="brand-dot">.</span></span></a>;
}
function Asterisk({ className = '' }) {
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="15"><path d="M50 4v92M4 50h92M17 17l66 66M17 83l66-66"/></g></svg>;
}
function downloadFile(content, type, filename) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a'); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function saveCalendar() {
  downloadFile(['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Nirvahan//Event//EN', 'BEGIN:VEVENT', 'UID:nirvahan-20261030@local', 'DTSTAMP:20261014T000000Z', 'DTSTART:20261030T050000Z', 'SUMMARY:NIRVAHAN — MCA Freshers 2026', 'LOCATION:Srusti Auditorium', 'DESCRIPTION:Bring your college ID. Confirm final arrangements with your class representative.', 'END:VEVENT', 'END:VCALENDAR', ''].join('\r\n'), 'text/calendar;charset=utf-8', 'nirvahan-2026.ics');
}
function OpeningTicket({ onClose, skipRef }) {
  return <div className="opening" role="dialog" aria-modal="true" aria-label="Welcome to Nirvahan" onKeyDown={e => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Tab') { e.preventDefault(); skipRef.current?.focus(); }
  }}>
    <div className="opening-top"><span>SRUSTI CAMPUS</span><span>ONE VERY GOOD BEGINNING.</span></div>
    <div className="opening-ticket" aria-hidden="true">
      <div className="opening-main"><span className="opening-label">A LITTLE SOMETHING WITH YOUR NAME ON IT</span><div className="opening-word">{'nirvahan'.split('').map((letter,i) => <span style={{'--i':i}} key={i}>{letter}</span>)}<span className="opening-dot">.</span></div><span className="opening-stamp">YOU’RE IN!</span><div className="opening-bottom"><span>THE FRESHERS PARTY</span><span>30 OCTOBER 2026 ↗</span></div></div>
      <div className="opening-stub"><Asterisk/><span>ADMIT<br/>YOURSELF.</span><small>30 / 10 / 26</small></div>
    </div>
    <div className="opening-caption"><span>Good people. Great beginnings.</span><button ref={skipRef} onClick={onClose}>Skip intro <ArrowRight size={16}/></button></div>
  </div>;
}
function App() {
  const [intro, setIntro] = useState(shouldShowIntro);
  const [menu, setMenu] = useState(false);
  const [count, setCount] = useState(remaining);
  const [playing, setPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [name, setName] = useState('');
  const [notice, setNotice] = useState('');
  const [filmError, setFilmError] = useState('');
  const [selectedMoment, setSelectedMoment] = useState(0);
  const video = useRef(null), menuButton = useRef(null), skipRef = useRef(null);
  const finishIntro = useCallback(() => {
    setIntro(false);
    try { sessionStorage.setItem(INTRO_KEY, 'seen'); } catch { /* The page works without storage. */ }
  }, []);
  useEffect(() => {
    if (!intro) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll:true });
    const timer = setTimeout(finishIntro, 2450);
    return () => {
      clearTimeout(timer); document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => { if (previousFocus?.isConnected) previousFocus.focus({ preventScroll:true }); });
    };
  }, [intro, finishIntro]);
  useEffect(() => { const timer = setInterval(() => setCount(remaining()), 1000); return () => clearInterval(timer); }, []);
  useEffect(() => {
    if (!menu) return;
    const close = e => { if (e.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menu]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { if (media.matches) { finishIntro(); video.current?.pause(); } };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [finishIntro]);
  async function toggleVideo() {
    if (!video.current) return;
    if (playing) video.current.pause();
    else { try { await video.current.play(); setFilmError(''); } catch { setFilmError('The film couldn’t play. Please try again.'); } }
  }
  async function share() {
    try { await navigator.clipboard.writeText(location.href.split('#')[0]); setNotice('Link copied. Send it to your people.'); }
    catch { setNotice('Copy the address from your browser to share the party.'); }
  }
  function keepsake(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const canvas = document.createElement('canvas'); canvas.width = 1400; canvas.height = 850;
    const ctx = canvas.getContext('2d');
    if (!ctx) { setNotice('Your browser couldn’t create the image. Please try another browser.'); return; }
    ctx.fillStyle = '#f6f3eb'; ctx.fillRect(0,0,1400,850);
    ctx.fillStyle = '#284be8'; ctx.fillRect(1040,0,360,850);
    ctx.fillStyle = '#252621'; ctx.font = '500 27px Arial'; ctx.fillText('SRUSTI CAMPUS / MCA FRESHERS 2026',65,90);
    ctx.font = 'bold 168px Arial'; ctx.fillText('nirvahan.',55,295,940);
    ctx.font = 'italic 42px Georgia'; ctx.fillText('A little less stranger. A lot more us.',65,390);
    ctx.font = '45px Arial'; ctx.fillText(name.trim(),65,525,900);
    ctx.strokeStyle = '#a6a498'; ctx.setLineDash([8,8]); ctx.beginPath(); ctx.moveTo(65,585); ctx.lineTo(975,585); ctx.stroke();
    ctx.font = 'bold 34px Arial'; ctx.fillText('30 OCTOBER 2026',65,660);
    ctx.font = '25px Arial'; ctx.fillText('10:30 AM IST / SRUSTI AUDITORIUM',65,710);
    ctx.font = '18px Arial'; ctx.fillText('PERSONAL KEEPSAKE · NOT AN ENTRY PASS',65,790);
    ctx.fillStyle = '#f6f3eb'; ctx.font = 'bold 140px Arial'; ctx.fillText('30',1110,340); ctx.font = 'bold 65px Arial'; ctx.fillText('OCT',1105,430); ctx.font = '26px Arial'; ctx.fillText('YOU BELONG',1083,645); ctx.fillText('HERE.',1135,685);
    const link = document.createElement('a'); link.download = 'nirvahan-invitation.png'; link.href = canvas.toDataURL('image/png'); link.click();
    setNotice('Your keepsake is ready. The beginning of a good story.');
  }
  const moments = [
    ['The dance floor', 'That one song. Everyone singing.', 'Live performances, your favourite tracks, and the friend who insists they can’t dance. Until they do.', '01'],
    ['The spotlight', 'The stage is yours, fresher.', 'Bring the voice, the moves, the poetry, or the unexpected talent. Your new batch is already cheering for you.', '02'],
    ['The new friendships', '“Save me a seat?”', 'A shared table. A slightly blurry photograph. A conversation that picks up again in class on Monday.', '03'],
  ];
  return <>
    {intro && <OpeningTicket onClose={finishIntro} skipRef={skipRef}/>}
    <div className={`site ${intro ? 'site-entering' : ''}`} inert={intro ? '' : undefined}>
      <a className="skip" href="#main">Skip to content</a>
      <header><div className="nav-shell"><Brand/>
        <nav id="main-nav" className={menu ? 'is-open' : ''} aria-label="Main navigation">
          {[['The good stuff','#experience'],['On the day','#lineup'],['A few details','#details']].map(([label,href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}
        </nav>
        <a className="nav-cta" href="#invitation">You're invited <ArrowUpRight size={17}/></a>
        <button ref={menuButton} className="menu-toggle" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="main-nav" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
      </div></header>
      <main id="main">
        <section className="hero wrap" id="home">
          <div className="hero-kicker"><span>SRUSTI CAMPUS PRESENTS</span><span className="kicker-line"/><span>THE MCA FRESHERS PARTY · 2026</span></div>
          <div className="hero-title"><h1>nirvahan<span>.</span></h1><span className="year-note">class of<br/><b>new beginnings</b><svg viewBox="0 0 90 60" aria-hidden="true"><path d="M3 5c5 42 50 45 77 23m-20-3 21 2-7 18"/></svg></span></div>
          <div className="hero-subline"><p>A little less stranger. <em>A lot more us.</em></p><span>New campus. New faces.<br/>One very good excuse to celebrate.</span></div>
          <div className="hero-stage">
            <div className="photo-frame"><img src="/freshers-editorial.png" alt="Students laughing and celebrating together" width="1536" height="1024" fetchpriority="high"/><span className="photo-corner">GOOD PEOPLE.<br/>GREAT BEGINNINGS.</span><span className="photo-caption">A PICTURE OF THE KIND OF DAY WE’RE HERE FOR.</span></div>
            <div className="party-sticker"><span>officially</span><strong>YOUR<br/>PEOPLE.</strong><Asterisk/></div>
            <div className="date-ticket"><span className="ticket-eyebrow">KEEP THIS DAY FREE</span><div className="big-date">30<span>OCTOBER<br/>2026 / FRIDAY</span></div><div className="ticket-perforation"/><p>Srusti Auditorium<br/><span>10:30 AM onwards · IST</span></p><a href="#invitation" className="ticket-cta">Make it yours <ArrowUpRight size={21}/></a><small>Bring yourself. Meet everyone else.</small></div>
          </div>
          <div className="hero-foot"><a href="#experience">Take a little look around <ArrowDown size={16}/></a><div className="countdown"><span>{Date.now() < eventTime ? 'SEE YOU IN' : 'LET’S CELEBRATE'}</span><strong>{count.map((value,i) => <React.Fragment key={i}><b>{String(value).padStart(2,'0')}<small>{['d','h','m','s'][i]}</small></b>{i < 3 && <i>:</i>}</React.Fragment>)}</strong></div><button onClick={saveCalendar}>Save the date <CalendarDays size={16}/></button></div>
        </section>
        <div className="party-ribbon" aria-hidden="true"><span>A FRESH START</span><Asterisk/><span>A FULL DANCE FLOOR</span><Asterisk/><span>A FEW NEW FAVOURITE PEOPLE</span><Asterisk/></div>
        <section className="experience-section wrap section" id="experience">
          <div className="section-heading"><p className="eyebrow">01 — THE GOOD STUFF</p><h2>Less awkward hellos.<br/><em>More “one more song.”</em></h2><p>No need to have it all figured out.<br/>Just show up. The rest happens here.</p></div>
          <div className="moments-layout"><div className="moment-selector"><div role="tablist" aria-label="Explore the party">
            {moments.map(([title,, ,number],i) => <button key={title} role="tab" id={`moment-tab-${i}`} aria-selected={selectedMoment===i} aria-controls="moment-panel" tabIndex={selectedMoment===i ? 0 : -1} onClick={()=>setSelectedMoment(i)} onKeyDown={e=>{
              let next;
              if (['ArrowDown','ArrowRight'].includes(e.key)) next=(i+1)%moments.length;
              if (['ArrowUp','ArrowLeft'].includes(e.key)) next=(i+moments.length-1)%moments.length;
              if (e.key==='Home') next=0;
              if (e.key==='End') next=moments.length-1;
              if (next!==undefined) { e.preventDefault(); setSelectedMoment(next); document.getElementById(`moment-tab-${next}`)?.focus(); }
            }}><span>{number}</span><strong>{title}</strong><ArrowUpRight size={24}/></button>)}</div>
            <div className="moment-copy" role="tabpanel" id="moment-panel" aria-labelledby={`moment-tab-${selectedMoment}`} tabIndex="0"><h3>{moments[selectedMoment][1]}</h3><p>{moments[selectedMoment][2]}</p></div>
          </div><div className={`film-card moment-${selectedMoment}`}><video ref={video} src="/crowd-cheering.mp4#t=1" muted loop playsInline preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} aria-label="Concert crowd and stage lights"/><div className="film-shade"/><span className="film-label">A LITTLE PREVIEW OF THE ENERGY</span><div className="film-handwriting">{['meet you on the\ndance floor.','main character\nmoment.','come for the party.\nstay for the people.'][selectedMoment].split('\n').map(line=><span key={line}>{line}</span>)}</div><button className="film-play" onClick={toggleVideo} aria-label={playing ? 'Pause event film' : 'Play event film'}>{playing ? <Pause size={19}/> : <Play size={19}/>}<span>{playing ? 'Pause the film' : 'Feel the vibe'}</span></button>{filmError && <p className="film-error" role="status">{filmError}</p>}</div></div>
        </section>
        <section className="lineup-section" id="lineup"><div className="wrap"><div className="lineup-header"><div><p className="eyebrow">02 — ON THE DAY</p><h2>A day worth<br/><em>clearing your calendar for.</em></h2></div><div className="handwritten-note">Friday plans?<br/><span>Sorted.</span><Asterisk/></div></div><div className="schedule">{schedule.map(([time,period,title,description,category],i)=><article className="schedule-row" key={title}><span className="schedule-index">0{i+1}</span><div className="schedule-time">{time}<small>{period}</small></div><div className="schedule-main"><span>{category}</span><h3>{title}</h3></div><p>{description}</p><ArrowUpRight size={22}/></article>)}</div><p className="schedule-note">A little room for spontaneity. Programme timings may change.</p></div></section>
        <section className="details-section section wrap" id="details"><div className="details-intro"><p className="eyebrow">03 — BEFORE YOU HEAD OUT</p><h2>A few things<br/><em>you might ask.</em></h2><div className="venue-note"><MapPin size={22}/><div><strong>Srusti Auditorium</strong><p>30 October 2026 · 10:30 AM IST</p></div></div><p className="details-small">Bring your college ID. Your class representative has the final word on entry and arrangements.</p></div><div className="faq">{questions.map(([q,a],i)=><div className="faq-item" key={q}><h3><button aria-expanded={openFaq===i} aria-controls={`answer-${i}`} id={`question-${i}`} onClick={()=>setOpenFaq(openFaq===i ? -1 : i)}>{q}{openFaq===i ? <Minus size={18}/> : <Plus size={18}/>}</button></h3><div id={`answer-${i}`} role="region" aria-labelledby={`question-${i}`} hidden={openFaq!==i}><p>{a}</p></div></div>)}</div></section>
        <section className="invitation-section" id="invitation"><div className="wrap invitation-inner"><div className="invite-copy"><p className="eyebrow">A SMALL MEMENTO OF A BIG BEGINNING</p><h2>This one<br/>has <em>your name</em><br/>on it.</h2><p>Make yourself a little keepsake.<br/>Someday, you’ll remember where it all started.</p><form onSubmit={keepsake}><label htmlFor="guest-name">What should we call you?</label><div className="name-field"><input id="guest-name" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name goes here" maxLength={45} required pattern=".*\S.*" autoComplete="name"/><button type="submit" aria-label="Download your personal keepsake"><Download size={21}/></button></div><small>A personal souvenir, not an entry pass. Your name stays in this browser.</small></form><div className="invite-actions"><button onClick={saveCalendar}><CalendarDays size={16}/> Save the date</button><button onClick={share}><Copy size={16}/> Tell a friend</button></div><p className="notice" role="status">{notice}</p></div><div className="keepsake"><div className="keepsake-top"><Mark/><span>THE FRESHERS PARTY / 2026</span></div><span className="keepsake-note">You belong here.</span><h3>nirvahan.</h3><div className="keepsake-name">{name.trim() || 'Hey, you.'}</div><p>Here’s to your first hello.</p><div className="keepsake-rule"/><div className="keepsake-info"><span>FRIDAY<strong>30 OCT ’26</strong></span><span>SRUSTI AUDITORIUM<strong>10:30 AM IST</strong></span></div><div className="keepsake-bottom"><span>PERSONAL KEEPSAKE<br/>NOT FOR ENTRY</span><Asterisk/></div><span className="keepsake-stamp">GOOD<br/>TIMES<br/>AHEAD ↗</span></div></div></section>
      </main>
      <footer className="wrap"><div className="footer-top"><Brand/><p>See you there, <em>fresher.</em></p><a href="#home" className="back-top" aria-label="Back to top"><ArrowUpRight size={25}/></a></div><div className="footer-bottom"><span>© 2026 Nirvahan · Srusti Campus</span><button onClick={()=>{ if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setIntro(true); }}><RotateCcw size={13}/> Play the intro again</button><span>30.10.26 — OUR FIRST CHAPTER.</span></div></footer>
    </div>
  </>;
}
const root = import.meta.hot?.data.root ?? createRoot(document.getElementById('root'));
if (import.meta.hot) import.meta.hot.data.root = root;
root.render(<App/>);

