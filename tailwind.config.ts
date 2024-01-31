import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'steewo-orange': {
          '50': '#fef4ee',
          '100': '#fce7d8',
          '200': '#f7cbb1',
          '300': '#f2a67f',
          '400': '#eb794c',
          '500': '#e86137',
          '600': '#d83e1e',
          '700': '#b32d1b',
          '800': '#8f261d',
          '900': '#73221b',
          '950': '#3e0e0c',
        },
        'steewo-yellow': {
          '50': '#fff9eb',
          '100': '#fdecc8',
          '200': '#fad78d',
          '300': '#f7b741',
          '400': '#f6a529',
          '500': '#ef8311',
          '600': '#d45f0b',
          '700': '#b0410d',
          '800': '#8f3211',
          '900': '#752a12',
          '950': '#431305',
        },
        'steewo-violet': {
          '50': '#f0f0fd',
          '100': '#e3e4fc',
          '200': '#ccccf9',
          '300': '#b0adf4',
          '400': '#978ced',
          '500': '#8570e4',
          '600': '#7755d6',
          '700': '#6746bc',
          '800': '#4d368c',
          '900': '#463679',
          '950': '#2a1f47',
        },
      },
    },
  },
}
