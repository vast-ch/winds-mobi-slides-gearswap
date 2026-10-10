<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'

// Self-running deck: each slide stays 10 s (or its `advanceAfter` frontmatter, in seconds),
// then advances, looping back to the start after the last slide. A slide with
// `advanceAfterVideo: N` instead advances N s after its video ends; `advanceAfter`
// then only caps the wait in case the video never plays.
const DEFAULT_DURATION_S = 10
const { next, go, currentPage, currentSlideRoute, total, isPresenter, isPrintMode } = useNav()
// Drop the vast.ch logo into public/vast-logo.svg; hidden until the file exists.
const vastLogo = ref(`${import.meta.env.BASE_URL}vast-logo.svg`)

let timer: ReturnType<typeof setTimeout> | undefined

function advance() {
  if (currentPage.value >= total.value) go(1)
  else next()
}

function frontmatter() {
  return currentSlideRoute.value.meta?.slide?.frontmatter ?? {}
}

function schedule() {
  clearTimeout(timer)
  timer = setTimeout(advance, (frontmatter().advanceAfter ?? DEFAULT_DURATION_S) * 1000)
}

// Media events don't bubble, so listen in the capture phase for any video ending.
function onVideoEnded(event: Event) {
  const after = frontmatter().advanceAfterVideo
  const onCurrentSlide = (event.target as Element).closest(`.slidev-page-${currentPage.value}`)
  if (after == null || !onCurrentSlide) return
  clearTimeout(timer)
  timer = setTimeout(advance, after * 1000)
}

onMounted(() => {
  if (isPresenter.value || isPrintMode.value) return
  watch(currentPage, schedule, { immediate: true })
  document.addEventListener('ended', onVideoEnded, true)
})

onUnmounted(() => {
  clearTimeout(timer)
  document.removeEventListener('ended', onVideoEnded, true)
})
</script>

<template>
  <div class="absolute top-3 left-4 flex items-center gap-2 text-sm font-semibold opacity-80">
    <img src="/winds-mobi-logo.svg" alt="" class="w-5 h-5" />
    winds.mobi
  </div>
  <div class="absolute bottom-3 left-4 flex items-center gap-2 text-sm font-semibold text-white">
    <img v-if="vastLogo" :src="vastLogo" alt="" class="h-5" @error="vastLogo = ''" />
    vast.ch
  </div>
  <div
    v-if="!currentSlideRoute.meta?.slide?.frontmatter?.hideDiscordQr"
    class="absolute bottom-3 right-4 flex flex-col items-center gap-1 text-xs font-semibold text-white">
    <img src="/discord-qr.svg" alt="Discord invite QR code" class="w-20 h-20 bg-white p-1 rounded" />
    join our Discord
  </div>
</template>
