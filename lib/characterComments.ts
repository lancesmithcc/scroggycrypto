/**
 * Cheeky character comments for losses and wins
 */

export interface CharacterComment {
  character: string;
  comment: string;
}

// Loss comments - SAVAGE and NASTY!
export const lossComments: CharacterComment[] = [
  { character: '😈', comment: 'LMAO you absolute donkey!' },
  { character: '👻', comment: 'Your skills just died. RIP.' },
  { character: '🤡', comment: 'You play like a drunk toddler!' },
  { character: '💀', comment: 'Your tokens AND dignity are gone!' },
  { character: '💩', comment: 'That spin was absolute garbage!' },
  { character: '🦹', comment: 'Zero. Brain. Cells.' },
  { character: '🤖', comment: 'Error 404: Skill not found!' },
  { character: '👽', comment: 'Even aliens think you\'re hopeless!' },
  { character: '🧛', comment: 'Your gameplay sucks more than I do!' },
  { character: '🧟', comment: 'Braindead spin from a braindead player!' },
  { character: '🎃', comment: 'Carved you up like a pumpkin!' },
  { character: '😎', comment: 'Imagine losing this badly. Couldn\'t be me.' },
  { character: '🤑', comment: 'Keep donating, chump!' },
  { character: '👹', comment: 'Get wrecked, loser!' },
  { character: '🐉', comment: 'You got BURNED!' },
  { character: '🦖', comment: 'Extinct. Just like your wallet.' },
  { character: '🦄', comment: 'Mythically bad gameplay!' },
  { character: '🐍', comment: 'Ssssso pathetic!' },
  { character: '🦂', comment: 'That stung! You suck!' },
  { character: '🕷️', comment: 'Tangled in your own stupidity!' },
  { character: '🧙‍♂️', comment: 'You need more than magic. You need a miracle!' },
  { character: '🍆', comment: 'What a dick move!' },
  { character: '🍑', comment: 'Peachy way to lose everything, dumbass!' },
  { character: '🚬', comment: 'Your chances went up in smoke!' },
  { character: '😻', comment: 'Purrr-fectly terrible!' },
];

// Big loss comments (when you lose 5+ tokens) - EXTRA BRUTAL
export const bigLossComments: CharacterComment[] = [
  { character: '💥', comment: 'KABOOM! You just got NUKED!' },
  { character: '😈', comment: 'Holy sh*t that was embarrassing!' },
  { character: '👻', comment: 'Your money AND brain just left!' },
  { character: '💀', comment: 'OBLITERATED! You absolute moron!' },
  { character: '🔥', comment: 'CREMATED! What a f*cking disaster!' },
  { character: '⚡', comment: 'REKT! You\'re getting destroyed!' },
  { character: '🌪️', comment: 'ANNIHILATED! Are you even trying?!' },
  { character: '🧙‍♂️', comment: 'That was spectacularly stupid!' },
  { character: '💩', comment: 'FLUSHED! Down the toilet you go!' },
  { character: '🤡', comment: 'CLOWNED! You\'re a complete joke!' },
  { character: '☠️', comment: 'MASSACRED! Delete your account!' },
];

// Win comments - backhanded compliments
export const winComments: CharacterComment[] = [
  { character: '🎉', comment: 'About damn time, slowpoke!' },
  { character: '🥳', comment: 'Wow, a monkey found a banana!' },
  { character: '🦸', comment: 'Even a broken clock is right twice!' },
  { character: '🧙‍♂️', comment: 'Pure dumb luck, nothing else!' },
  { character: '⭐', comment: 'Don\'t get cocky, you\'ll lose it all!' },
  { character: '🍀', comment: 'Luck is all you\'ve got going for you!' },
  { character: '😇', comment: 'Miracle! Now quit while you\'re ahead!' },
  { character: '🎊', comment: 'Congrats, you\'re still gonna lose!' },
  { character: '👑', comment: 'Enjoy it while it lasts, peasant!' },
  { character: '🏆', comment: 'You\'ll blow it all anyway!' },
  { character: '🤑', comment: 'Nice! Now give it back to me!' },
  { character: '💩', comment: 'Even shit gets lucky sometimes!' },
];

// Big win comments (20x or more) - Still sassy
export const bigWinComments: CharacterComment[] = [
  { character: '🤯', comment: 'NO F*CKING WAY! You got lucky!' },
  { character: '🎆', comment: 'HOLY SHIT! That was insane!' },
  { character: '🧙‍♂️', comment: 'Okay that was actually impressive!' },
  { character: '💎', comment: 'DAMN! Big dick energy!' },
  { character: '🚀', comment: 'MOON SHOT! Don\'t blow it now!' },
  { character: '⚡', comment: 'ELECTRIFIED! Now cash out, idiot!' },
  { character: '👑', comment: 'KING SH*T! Bet you can\'t do it again!' },
  { character: '🔮', comment: 'Witchcraft! This is rigged!' },
  { character: '💩', comment: 'Well I\'ll be damned! Shocked!' },
  { character: '🤡', comment: 'Even clowns get lucky! HOLY HELL!' },
  { character: '🤑', comment: 'JACKPOT BABY! Now I want it back!' },
];

/**
 * Get a random comment for a loss
 */
export function getRandomLossComment(betAmount: number): CharacterComment {
  const comments = betAmount >= 5 ? bigLossComments : lossComments;
  return comments[Math.floor(Math.random() * comments.length)];
}

/**
 * Get a random comment for a win
 */
export function getRandomWinComment(payout: number, betAmount: number): CharacterComment {
  const isBigWin = payout >= betAmount * 20;
  const comments = isBigWin ? bigWinComments : winComments;
  return comments[Math.floor(Math.random() * comments.length)];
}

