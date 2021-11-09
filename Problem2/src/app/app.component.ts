import { Component, OnInit } from '@angular/core';
import { Card, Deck, VALUES, SUITS, POKER_HAND } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public cardsOnHand: string[] = [];
  public fiveCards: string[] = [];
  public pokerHands: string[][] = [];
  public strongest!: string;
  public mainDeck?: Deck | null;
  public playerDeck?: Deck | null;
  public strongestPokerHand: string = '';
  suits = SUITS;
  faces = VALUES;
  private countObj: any = {};

  private readonly order = '23456789TJQKA';

  public ngOnInit() {
    this.mainDeck = new Deck();
  }

  public shuffleTheDeck() {
    this.mainDeck?.shuffle();
    this.playerDeck = null;
    this.countObj = {};
    this.strongestPokerHand = "";
  }

  playPoker() {
    this.playerDeck = new Deck(this.mainDeck?.cards.slice(0, 5));
    this.countEachOfCard();
    if (this.isFlush()) {
      if (this.isStraight()) {
        if (this.playerDeck.cards.find(card => card.value === "A")) {
          this.strongestPokerHand = POKER_HAND.ROYAL_FLUSH;
        } else {
          this.strongestPokerHand = POKER_HAND.STRAIGHT_FLUSH;
        }
      } else {
        this.strongestPokerHand = POKER_HAND.FLUSH;
      }
    } else if (this.isFourOfAKind()) {
      this.strongestPokerHand = POKER_HAND.FOUR_OF_A_KIND;
    } else if (this.isFullHouse()) {
      this.strongestPokerHand = POKER_HAND.FULL_HOUSE;
    } else if (this.isStraight()) {  
      this.strongestPokerHand = POKER_HAND.STRAIGHT;
    } else if (this.isThreeOfAKind()) {
      this.strongestPokerHand = POKER_HAND.THREE_OF_A_KIND;
    } else if (this.isTwoPair()) {
      this.strongestPokerHand = POKER_HAND.TWO_PAIR;
    } else if (this.isOnePair()) {
      this.strongestPokerHand = POKER_HAND.ONE_PAIR;
    } else {
      this.playerDeck.cards.sort((a, b) => {
        return VALUES.indexOf(a.value) - VALUES.indexOf(b.value);
      });
      this.strongestPokerHand = `${POKER_HAND.HIGH_CARD}: ${this.playerDeck.cards[this.playerDeck.cards.length - 1].suit} - ${this.playerDeck.cards[this.playerDeck.cards.length - 1].value}`;
    }

  }

  countEachOfCard() {
    this.playerDeck?.cards.forEach(card => {
      if (!this.countObj[(card.value)]) {
        this.countObj[card.value] = 1;
      } else {
        this.countObj[card.value] = ++ this.countObj[card.value];
      }
    });
  }

  isFlush() {
    const firstValue = this.playerDeck?.cards[0].value;
    const diff = this.playerDeck?.cards.find(card => card.value !== firstValue);
    return diff ? false : true;
  }
  
  isStraight() {
    this.playerDeck?.cards.sort((a, b) => {
      return VALUES.indexOf(a.value) - VALUES.indexOf(b.value);
    });
    let straight = true;
    this.playerDeck?.cards.forEach((card, index) => {
      if (this.playerDeck?.cards[index + 1] && Math.abs(VALUES.indexOf(card.value) - VALUES.indexOf(this.playerDeck?.cards[index + 1].value)) !== 1) {
        straight = false;
      }
    });
    return straight;
  }
  
  isFourOfAKind() {
    const isFOAK = Object.keys(this.countObj).find(key => this.countObj[key] === 4);
    return isFOAK ? true : false;
  }
  
  isFullHouse() {
    if (Object.keys(this.countObj).length != 2) {
      return false;
    } else {
      return true;
    }
  }
  
  isThreeOfAKind() {
    if (Object.keys(this.countObj).length === 3) {
      const isTOAK = Object.keys(this.countObj).find(key => this.countObj[key] === 3);
      return isTOAK ? true : false;
    } else {
      return false;
    }
  }
  
  isTwoPair() {
    if (Object.keys(this.countObj).length === 3) {
      let isTwoPair = 0;
      Object.keys(this.countObj).forEach(key => {
        if (this.countObj[key] === 2) {
          isTwoPair++;
        }
      });
      return isTwoPair === 2 ? true : false;
    } else {
      return false;
    }
  }
  
  isOnePair() {
    if (Object.keys(this.countObj).length === 4) {
      const isOnePair = Object.keys(this.countObj).find(key => this.countObj[key] === 2);
      return isOnePair ? true : false;
    } else {
      return false;
    }
  }
}
