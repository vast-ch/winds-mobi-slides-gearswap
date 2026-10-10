<template>
  <!-- Sky and alpine ridges behind every slide's content -->
  <div class="absolute inset-0 alp-sky" />
  <svg
    class="absolute inset-x-0 bottom-0 w-full h-28 pointer-events-none"
    viewBox="0 0 1000 120"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      fill="var(--ridge-far)"
      d="M0 70 L60 48 L110 62 L170 30 L230 58 L290 40 L340 55 L400 22 L460 50 L520 36 L580 60 L640 26 L700 52 L760 38 L820 58 L880 30 L940 50 L1000 40 V120 H0 Z"
    />
    <path
      fill="var(--ridge-mid)"
      d="M0 90 L80 66 L140 82 L210 56 L270 80 L330 64 L390 86 L450 60 L520 84 L590 68 L650 88 L720 58 L790 82 L860 70 L930 88 L1000 66 V120 H0 Z"
    />
    <path
      fill="var(--ridge-near)"
      d="M0 104 L90 90 L170 102 L260 86 L340 104 L430 92 L520 106 L610 90 L700 104 L790 92 L880 106 L1000 94 V120 H0 Z"
    />
  </svg>
</template>
