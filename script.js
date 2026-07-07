/* =======================================================================
DATA — sab 5 sawaal ek array mein.
========================================================================= */
const QUESTIONS = [
    {
        title: "Sabse pehle… tumhe pata hai tum kitni cute ho? 🥰",
        subtitle: "Do you know how cute you are?",
        options: ["Thoda sa 🙂", "Bahut zyada! 💕", "Tum batao na 👀"]
    },
    {
        title: "Agar main tumhe abhi ek gift doon, sabse pehle kya yaad aayega?",
        subtitle: "If I gave you a gift right now, what comes to mind?",
        options: ["Chocolate 🍫", "Ek pyara hug 🤗", "Bas tumhara pyar ❤️"]
    },
    {
        title: "Jab tum mujhse baat karte ho, mujhe kaisa lagta hai pata hai?",
        subtitle: "Do you know how I feel when we talk?",
        options: ["Khushi 😊", "Dil ki dhadkan tez 💓", "Dono ek saath 💕"]
    },
    {
        title: "Ek chhota sa raaz batau tumhe? 🤭",
        subtitle: "Want to know a little secret?",
        options: ["Haan bolo na 👉", "Batao jaldi se 😳", "Main sun rahi hoon 💗"]
    },
    {
        title: "Woh raaz yeh hai… tumhare bina din adhoora sa lagta hai. 😢",
        subtitle: "The secret is… my day feels incomplete without you.",
        options: ["Awww 🥹", "Mujhe bhi kuch kehna hai", "Aage badho na 💗"]
    }
];

let currentQuestion = 0;
const song = document.getElementById('proposalAudio');

/* -----------------------------------------------------------------------
   1) AMBIENT BACKGROUND HEARTS
----------------------------------------------------------------------- */
function spawnAmbientHearts(count) {
    const layer = document.getElementById('ambient');
    const emojis = ['💗', '💖', '💓'];
    for (let i = 0; i < count; i++) {
        const h = document.createElement('div');
        h.className = 'ambient-heart';
        h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        h.style.left = Math.random() * 100 + '%';
        h.style.fontSize = (12 + Math.random() * 14) + 'px';
        h.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
        h.style.animationDuration = (9 + Math.random() * 8) + 's';
        h.style.animationDelay = (Math.random() * 10) + 's';
        layer.appendChild(h);
    }
}
spawnAmbientHearts(16);

/* -----------------------------------------------------------------------
   2) BURST HEARTS
----------------------------------------------------------------------- */
function heartBurst(count = 14, big = false) {
    const layer = document.getElementById('burstLayer');
    const colors = ['#ff4c8d', '#fff8fb'];
    for (let i = 0; i < count; i++) {
        const h = document.createElement('div');
        h.className = 'burst-heart';
        h.textContent = '❤';
        const size = big ? (18 + Math.random() * 26) : (10 + Math.random() * 14);
        const duration = 2.2 + Math.random() * 1.8;
        const delay = Math.random() * 0.6;
        const drift = (Math.random() - 0.5) * 120;
        h.style.left = Math.random() * 100 + '%';
        h.style.fontSize = size + 'px';
        h.style.color = colors[Math.random() > 0.5 ? 0 : 1];
        h.style.setProperty('--drift', drift + 'px');
        h.style.animationDuration = duration + 's';
        h.style.animationDelay = delay + 's';
        layer.appendChild(h);
        setTimeout(() => h.remove(), (duration + delay) * 1000 + 200);
    }
}

/* -----------------------------------------------------------------------
   3) CARD SWITCHING HELPER
----------------------------------------------------------------------- */
function showCard(id) {
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    showCard('card-quiz');
    renderQuestion();
}

/* -----------------------------------------------------------------------
   4) RENDER A QUESTION
----------------------------------------------------------------------- */
function renderQuestion() {
    const q = QUESTIONS[currentQuestion];

    document.getElementById('sawaalLabel').textContent =
        `SAWAAL ${currentQuestion + 1} / ${QUESTIONS.length}`;
    document.getElementById('qTitle').textContent = q.title;
    document.getElementById('qSubtitle').textContent = q.subtitle;

    const pct = ((currentQuestion) / QUESTIONS.length) * 100;
    document.getElementById('progressFill').style.width = pct + '%';

    const optionsWrap = document.getElementById('qOptions');
    optionsWrap.innerHTML = '';
    q.options.forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.textContent = text;
        btn.onclick = () => selectOption(btn);
        optionsWrap.appendChild(btn);
    });
}

/* -----------------------------------------------------------------------
   5) OPTION SELECT
----------------------------------------------------------------------- */
function selectOption(btn) {
    document.querySelectorAll('#qOptions .option').forEach(o => o.classList.remove('selected'));
    btn.classList.add('selected');
    heartBurst(10, false);

    const pct = ((currentQuestion + 1) / QUESTIONS.length) * 100;
    document.getElementById('progressFill').style.width = pct + '%';

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < QUESTIONS.length) {
            renderQuestion();
        } else {
            showCard('card-final');
            heartBurst(20, true);
        }
    }, 650);
}

/* -----------------------------------------------------------------------
   6) FINAL SCREEN: YES CLICK PE AUTO-PLAY
----------------------------------------------------------------------- */
function runAway() {
    const noBtn = document.getElementById('noBtn');
    noBtn.classList.add('gone');
}

function sayYes() {
    // HTML wale original audio element ko direct call dekar play kar rahe hain
    const audioEl = document.getElementById('proposalAudio');
    if (audioEl) {
        audioEl.play().catch(err => console.log("Audio play blocker handled:", err));
    }

    // Screen aur messages badal rahe hain aur dher saare dil udd rahe hain
    showCard('card-celebrate');
    heartBurst(35, true);
}

/* -----------------------------------------------------------------------
   7) EXTRA TOUCH BUTTON (Isse song par koi farq nahi padega)
----------------------------------------------------------------------- */
function extraHearts() {
    // Song ke saath koi chhed-chhad nahi hogi, bas screen par dil udte rahenge
    heartBurst(30, true);
}