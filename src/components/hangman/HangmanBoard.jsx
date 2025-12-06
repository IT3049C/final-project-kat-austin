export default function HangmanBoard({ attempts }) {
    const MAX_ATTEMPTS = 6;
    const wrong = Math.max(0, MAX_ATTEMPTS - attempts);

    return (
        <svg viewBox="0 0 120 140" width="180" height="210" className="hangman-board">
            {/* hang */}
            <line x1="10" y1="130" x2="110" y2="130" stroke="#3e2316ff" strokeWidth="4" />
            <line x1="30" y1="130" x2="30" y2="10" stroke="#3e2316ff" strokeWidth="4" />
            <line x1="30" y1="10" x2="80" y2="10" stroke="#3e2316ff" strokeWidth="4" />
            <line x1="80" y1="10" x2="80" y2="25" stroke="#3e2316ff" strokeWidth="3" />

            {/* head */}
            {wrong > 0 && <circle cx="80" cy="37" r="12" stroke="#000" strokeWidth="4" fill="transparent" />}

            {/* body */}
            {wrong > 1 && <line x1="80" y1="49" x2="80" y2="85" stroke="#000" strokeWidth="4" />}

            {/* left arm */}
            {wrong > 2 && <line x1="80" y1="60" x2="62" y2="72" stroke="#000" strokeWidth="4" />}

            {/* right arm */}
            {wrong > 3 && <line x1="80" y1="60" x2="98" y2="72" stroke="#000" strokeWidth="4" />}

            {/* left leg */}
            {wrong > 4 && <line x1="80" y1="85" x2="66" y2="105" stroke="#000" strokeWidth="4" />}

            {/* right leg */}
            {wrong > 5 && <line x1="80" y1="85" x2="94" y2="105" stroke="#000" strokeWidth="4" />}
        </svg>
    );
}