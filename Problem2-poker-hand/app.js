const {Deck, VALUES} = require('./deck.js')

playPoker();

function playPoker() {
    const deck = new Deck()
    deck.shuffle()

    let playerDeck = new Deck(deck.cards.slice(0, 5));
    if (isFlush(playerDeck.cards)) {
      if (isStraight(playerDeck.cards)) {
        if (playerDeck.cards.find(card => card.value === "A")) {
          console.log(`Royal Flush: ${JSON.stringify(playerDeck.cards)}`);
        } else {
          console.log(`Straight Flush: ${JSON.stringify(playerDeck.cards)}`);
        }        
      } else {
        console.log(`Flush: ${JSON.stringify(playerDeck.cards)}`);
      }
    } else if (isFourOfAKind(playerDeck.cards)) {
      console.log(`Four of a kind: ${JSON.stringify(playerDeck.cards)}`);
    } else if (isFullHouse(playerDeck.cards)) {
      console.log(`Full house: ${JSON.stringify(playerDeck.cards)}`);
    } else if (isStraight(playerDeck.cards)) {
      console.log(`Straight: ${JSON.stringify(playerDeck.cards)}`);
    } else if (isThreeOfAKind(playerDeck.cards)) {
      console.log(`Three of a kind: ${JSON.stringify(playerDeck.cards)}`);
    } else if (isTwoPair(playerDeck.cards)) {
      console.log(`Two pair: ${JSON.stringify(playerDeck.cards)}`);
    } else if (isOnePair(playerDeck.cards)) {
      console.log(`One pair: ${JSON.stringify(playerDeck.cards)}`);
    } else {
      playerDeck.cards.sort((a, b) => {
        return VALUES.indexOf(a.value) - VALUES.indexOf(b.value);
      });
      console.log(`High card: ${JSON.stringify(playerDeck.cards[playerDeck.cards.length - 1])}\n${JSON.stringify(playerDeck.cards)}`);
    }

}

function isFlush(cards) {
  const firstValue = cards[0].value;
  const diff = cards.find(card => card.value !== firstValue);
  return diff ? false : true;
}

function isStraight(cards) {
  cards.sort((a, b) => {
    return VALUES.indexOf(a.value) - VALUES.indexOf(b.value);
  });
  let straight = true;
  cards.forEach((card, index) => {
    if (cards[index + 1] && Math.abs(VALUES.indexOf(card.value) - VALUES.indexOf(cards[index + 1].value)) !== 1) {
      straight = false;
    }
  });
  return straight;
}

function countEachOfCard(cards) {
  const count = {};
  cards.forEach((card) => {
    if (!count[card.value]) {
      count[card.value] = 1;
    } else {
      count[card.value] = ++ count[card.value];
    }
  });
  return count;
}

function isFourOfAKind(cards) {
  const count = countEachOfCard(cards);
  const isFOAK = Object.keys(count).find(key => count[key] === 4);
  return isFOAK ? true : false;
}

function isFullHouse(cards) {
  const count = countEachOfCard(cards);
  if (Object.keys(count).length != 2) {
    return false;
  } else {
    return true;
  }
}

function isThreeOfAKind(cards) {
  const count = countEachOfCard(cards);
  if (Object.keys(count).length === 3) {
    const isTOAK = Object.keys(count).find(key => count[key] === 3);
    return isTOAK ? true : false;
  } else {
    return false;
  }
}

function isTwoPair(cards) {
  const count = countEachOfCard(cards);
  if (Object.keys(count).length === 3) {
    let isTwoPair = 0;
    Object.keys(count).forEach(key => {
      if (count[key] === 2) {
        isTwoPair++;
      }
    });
    return isTwoPair === 2 ? true : false;
  } else {
    return false;
  }
}

function isOnePair(cards) {
  const count = countEachOfCard(cards);
  if (Object.keys(count).length === 4) {
    const isOnePair = Object.keys(count).find(key => count[key] === 2);
    return isOnePair ? true : false;
  } else {
    return false;
  }
}
