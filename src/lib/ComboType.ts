import type { Rank } from './Rank'

export class ComboType {
  public readonly rank: Rank
  public readonly rank2: Rank
  public readonly suited: boolean
  constructor(rank: Rank, rank2: Rank, suited: boolean) {
    if (rank < rank2) {
      ;[rank, rank2] = [rank2, rank]
    }
    this.rank = rank
    this.rank2 = rank2
    this.suited = suited
  }

  isSuit() {
    return this.suited
  }

  isOffsuit() {
    return !this.isSuit()
  }

  isPair() {
    return this.rank.equals(this.rank2)
  }

  combos() {
    if (this.isPair()) {
      return 6
    } else if (this.isSuit()) {
      return 4
    } else {
      return 12
    }
  }

  toString() {
    const ranks = `${this.rank}${this.rank2}`
    if (this.isPair()) {
      return `${ranks}`
    } else if (this.isSuit()) {
      return `${ranks}s`
    } else {
      return `${ranks}o`
    }
  }
}
