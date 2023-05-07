import { Rank } from './Rank'
import { Suit } from './Suit'

export class Card {
  constructor(readonly rank: Rank, readonly suit: Suit) {}

  static fromString(s: string) {
    return new Card(
      Rank.fromString(s.slice(0, s.length - 1)),
      Suit.fromString(s.slice(s.length - 1))
    )
  }

  equals(card: Card) {
    return card.rank.equals(this.rank) && card.suit.equals(this.suit)
  }

  toString() {
    return `${this.rank.toString()}${this.suit.toString()}`
  }
}
