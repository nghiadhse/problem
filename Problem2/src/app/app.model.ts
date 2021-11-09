export const SUITS = [
    "Heart",
    "Diamond",
    "Club",
    "Spade"
];
export const VALUES = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A"
];

export enum POKER_HAND {
    ROYAL_FLUSH = "Royal Flush",
    STRAIGHT_FLUSH = "Straight Flush",
    FLUSH = "Flush",
    FOUR_OF_A_KIND = "Four of a kind",
    FULL_HOUSE = "Full house",
    STRAIGHT = "Straight",
    THREE_OF_A_KIND = "Three of a kind",
    TWO_PAIR = "Two pair",
    ONE_PAIR = "One pair",
    HIGH_CARD = "High card"
};

export class Deck {
    cards: Card[];

    constructor(cards?: Card[]) {
        this.cards = cards ? cards : this.freshDeck();
    }

    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }

    freshDeck() {
        return SUITS.flatMap(suit => {
            return VALUES.map(value => {
                return new Card(suit, value)
            })
        })
    }
}

export class Card {

    suit: string;
    value: string;

    constructor(suit: string, value: string) {
        this.suit = suit
        this.value = value
    }

}
