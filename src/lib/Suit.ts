import { map, range } from 'ramda'

export class Suit {
  static readonly CLUB = new Suit(1)
  static readonly DIAMOND = new Suit(2)
  static readonly HEART = new Suit(3)
  static readonly SPADE = new Suit(4)

  static readonly ALL = map(Suit.fromNumber, range(1, 5))

  constructor(private readonly value: number) {
    if (value < 1 || value > 4) {
      throw new Error('Suit must be in range of [1, 4]')
    }
  }

  static fromNumber(n: number) {
    return new Suit(n)
  }

  static fromString(s: string) {
    switch (s) {
      case 'c':
        return Suit.CLUB
      case 'd':
        return Suit.DIAMOND
      case 'h':
        return Suit.HEART
      case 's':
        return Suit.SPADE
      default:
        throw new Error(`Suit.fromString expect one of 'c', 'd', 'h', 's'`)
    }
  }

  equals(suit: Suit) {
    return suit.value === this.value
  }

  valueOf() {
    return this.value
  }

  toString() {
    switch (this.value) {
      case Suit.CLUB.value:
        return 'c'
      case Suit.DIAMOND.value:
        return 'd'
      case Suit.HEART.value:
        return 'h'
      case Suit.SPADE.value:
        return 's'
      default:
        throw new Error(`Suit.toString with value ${this.value}`)
    }
  }
}
