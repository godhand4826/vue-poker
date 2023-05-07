import { map, range } from 'ramda'

export class Rank {
  static readonly TWO = new Rank(2)
  static readonly THREE = new Rank(3)
  static readonly FOUR = new Rank(4)
  static readonly FIVE = new Rank(5)
  static readonly SIX = new Rank(6)
  static readonly SEVEN = new Rank(7)
  static readonly EIGHT = new Rank(8)
  static readonly NINE = new Rank(9)
  static readonly TEN = new Rank(10)
  static readonly JACK = new Rank(11)
  static readonly QUEEN = new Rank(12)
  static readonly KING = new Rank(13)
  static readonly ACE = new Rank(14)

  static readonly ALL = map(Rank.of, range(2, 15))

  constructor(private readonly value: number) {
    if (value < 2 || value > 14) {
      throw new Error('Rank must be in range of [2, 14]')
    }
  }

  static of(n: number) {
    return new Rank(n)
  }

  static fromString(s: string) {
    switch (s) {
      case 'T':
        return Rank.TEN
      case 'J':
        return Rank.JACK
      case 'Q':
        return Rank.QUEEN
      case 'K':
        return Rank.KING
      case 'A':
        return Rank.ACE
      default:
        return this.of(Number(s))
    }
  }

  equals(rank: Rank) {
    return rank.value === this.value
  }

  compareTo(rank: Rank) {
    return this.value - rank.value
  }

  valueOf() {
    return this.value
  }

  toString() {
    switch (this.value) {
      case Rank.TEN.value:
        return 'T'
      case Rank.JACK.value:
        return 'J'
      case Rank.QUEEN.value:
        return 'Q'
      case Rank.KING.value:
        return 'K'
      case Rank.ACE.value:
        return 'A'
      default:
        return this.value.toString()
    }
  }
}
