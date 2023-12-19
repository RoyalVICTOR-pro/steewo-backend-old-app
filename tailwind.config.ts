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
          '50': '#f9f7fd',
          '100': '#f0ecfb',
          '200': '#e3dcf8',
          '300': '#cec0f2',
          '400': '#b098e8',
          '500': '#9170dc',
          '600': '#7951cc',
          '700': '#653fb1',
          '800': '#53358b',
          '900': '#482e75',
          '950': '#2c1655',
        }  
      }
    }
  }
}
