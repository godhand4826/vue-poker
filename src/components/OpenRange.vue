<script lang="ts">
import { reverse, sum } from 'ramda'
import { Rank } from '../lib/Rank'
import { ComboType } from '../lib/ComboType'
import ComboTypeGrid from './ComboTypeGrid.vue'

class Grid {
  constructor(
    public readonly y: number,
    public readonly x: number,
    public isSelected: boolean,
    public readonly comboType: ComboType
  ) {}
  toggle() {
    this.isSelected = !this.isSelected
  }
}

export default {
  beforeMount() {
    this.init()
  },
  data() {
    return {
      isMousedown: false,
      cardMatrix: Array(13)
        .fill(null)
        .map(() => Array(13).fill(null)) as Grid[][]
    }
  },
  computed: {
    selectedGrids(): Grid[] {
      let result = Array()
      for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 13; x++) {
          if (this.cardMatrix[y][x].isSelected) {
            result.push(this.cardMatrix[y][x])
          }
        }
      }
      return result
    },
    selectedCombos(): ComboType[] {
      return this.selectedGrids.map((g) => g.comboType)
    },
    comboSum(): number {
      return sum(this.selectedCombos.map((ct) => ct.combos()))
    },
    percentage(): number {
      return (this.comboSum / 1326) * 100
    }
  },
  methods: {
    init() {
      const ranks = reverse(Rank.ALL)
      for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 13; x++) {
          const r1 = ranks[y]
          const r2 = ranks[x]
          const isSuited = x > y
          this.cardMatrix[y][x] = new Grid(y, x, false, new ComboType(r1, r2, isSuited))
        }
      }
    },
    clearAll() {
      for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 13; x++) {
          this.cardMatrix[y][x].isSelected = false
        }
      }
    },
    selectAll() {
      for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 13; x++) {
          this.cardMatrix[y][x].isSelected = true
        }
      }
    },
    selectAllPocket() {
      for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 13; x++) {
          if (this.cardMatrix[y][x].comboType.isPair()) {
            this.cardMatrix[y][x].isSelected = true
          }
        }
      }
    },
    selectAllSuited() {
      for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 13; x++) {
          if (this.cardMatrix[y][x].comboType.isSuit()) {
            this.cardMatrix[y][x].isSelected = true
          }
        }
      }
    },
    handleDrag(grid: Grid) {
      if (this.isMousedown) {
        grid.isSelected = !grid.isSelected
      }
    },
    doubleClicked(grid: Grid) {
      let y = grid.y
      let x = grid.x
      const origin = grid.isSelected
      if (grid.comboType.isPair()) {
        while (x >= 0 && y >= 0 && this.cardMatrix[y][x].isSelected == origin) {
          this.cardMatrix[y][x].toggle()
          x -= 1
          y -= 1
        }
      } else if (grid.comboType.isSuit()) {
        while (x != y && this.cardMatrix[y][x].isSelected == origin) {
          this.cardMatrix[y][x].toggle()
          x -= 1
        }
      } else {
        while (x != y && this.cardMatrix[y][x].isSelected == origin) {
          this.cardMatrix[y][x].toggle()
          y -= 1
        }
      }
    }
  },
  components: { ComboTypeGrid }
}
</script>

<template>
  <div
    class="prevent-select wrapper"
    style="display: grid"
    v-on:mousedown="isMousedown = true"
    v-on:mouseup="isMousedown = false"
  >
    <div>
      <a v-on:click="selectAll()"> All </a> / <a v-on:click="selectAllPocket()"> Pocket </a> /
      <a v-on:click="selectAllSuited()"> Suited </a> /
      <a v-on:click="clearAll()"> Clear </a>
    </div>
    <div>{{ comboSum }} / {{ 1326 }} = {{ percentage.toFixed(2) }}%</div>
    <table>
      <tr v-for="(row, i) in cardMatrix" :key="i">
        <td v-for="(grid, j) in row" :key="j">
          <ComboTypeGrid
            v-on:mouseenter="handleDrag(grid as Grid)"
            v-on:mousedown="grid.toggle()"
            v-on:dblclick="doubleClicked(grid as Grid)"
            v-bind:isSelected="grid.isSelected"
            v-bind:isPair="grid.comboType.isPair()"
            v-bind:isSuit="grid.comboType.isSuit()"
            v-bind:isOffsuit="grid.comboType.isOffsuit()"
            v-bind:text="grid.comboType.toString()"
          >
          </ComboTypeGrid>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.prevent-select {
  user-select: none;
  display: block;
  place-self: center;
}

.wrapper > * {
  place-self: center;
}
</style>
