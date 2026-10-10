---
theme: default
title: winds.mobi by the numbers
info: |
  Self-running deck, advances every 10 s (or a slide's `advanceAfter`).
  Traffic window: 19 Sep - 9 Oct 2026 (GoAccess report from reports.winds.mobi).
transition: slide-left
favicon: /winds-mobi-logo.svg
mdc: true
layout: default
fonts:
  sans: Barlow
  serif: Barlow Condensed
  weights: '400,600,700'
---

# winds.mobi since 2012?

<div class="flex gap-6 items-center justify-center pt-4">
<img src="/2016-windsmobi-total.jpg" class="rounded shadow h-[20rem]" />
<img src="/2016-windsmobi-kasten.png" class="rounded shadow w-56" />
</div>

<div class="absolute bottom-3 inset-x-0 text-center text-xs text-white opacity-80">2016 - lu-glidz.blogspot.com</div>

---

# winds.mobi since 2026-07-15

<img src="/2026-windsmobi.png" class="rounded shadow max-h-[24rem] mx-auto mt-4" />

---
layout: center
class: text-center
---

# The hardware

<div class="text-6xl font-bold py-6">1 VPS</div>

**2 vCores - 4 GB RAM - 80 GB SSD - Ubuntu**

OVH "low cost" VPS for **9.50 EUR / month**

API, scrapers, admin, MongoDB, Postgres, Redis - all on the same box.

<div class="pt-6 opacity-80">
~35 M requests / month = <b>~0.27 EUR per million requests</b>
</div>

<!--
Not a DB-as-a-service, no autoscaling, no replicas.
-->

---

# Data in

<div class="grid grid-cols-2 gap-12 pt-2 pr-20 items-center">
<div class="flex flex-col gap-8 text-center">
<div>
<div class="text-5xl font-bold">3,500+</div>
stations
</div>
<div>
<div class="text-5xl font-bold">~3,200</div>
reported in the last hour
</div>
<div>
<div class="text-5xl font-bold">5 min</div>
refresh interval
</div>
</div>
<div>

| Provider | Stations |
|---|---:|
| METAR (airports) | 1,000+ |
| holfuy | 820 |
| pioupiou | 698 |
| FFVL | 490 |
| SLF | 203 |
| MeteoSwiss | 155 |
| 13 others | ~150 |

</div>
</div>

<!--
Snapshot from the public API on 9 Oct 2026. METAR is capped at 1000 by the API's limit, real number is higher.
Rough write load: ~3,200 live stations / 300 s = ~10 station updates per second into MongoDB (estimate).
-->

---

# Data out

<div class="grid grid-cols-2 gap-x-12 gap-y-8 pt-8 text-center">
<div>
<div class="text-5xl font-bold">1.2 M</div>
requests / day
</div>
<div>
<div class="text-5xl font-bold">~18,900</div>
unique visitors / day<br/><span class="text-sm opacity-70">(IP + user agent)</span>
</div>
<div>
<div class="text-5xl font-bold">7.2 GB</div>
out / day
</div>
<div>
<div class="text-5xl font-bold">0.003 %</div>
5xx error rate<br/><span class="text-sm opacity-70">(720 of 24.2 M)</span>
</div>
</div>

<!--
Full report window 19 Sep - 9 Oct: 24.2M requests, 151 GB, 378k visitor-days.
Daily numbers use the 19 full days only.
-->

---

# Requests per second

<div class="grid grid-cols-2 gap-8 pt-2 text-center">
<div><div class="text-4xl font-bold">14 rps</div>average</div>
<div><div class="text-4xl font-bold">16 rps</div>busiest hour (14:00)</div>
</div>

```mermaid {scale: 0.6}
xychart-beta
  title "Average requests/s by hour of day (CEST)"
  x-axis [00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  y-axis "req/s" 0 --> 18
  bar [11.2, 10.5, 10.2, 10.2, 10.2, 11.3, 11.8, 13.6, 14.9, 15.4, 14.8, 15.0, 15.5, 15.7, 16.0, 15.6, 15.2, 14.5, 14.0, 13.3, 13.3, 13.1, 12.9, 11.7]
```

<!--
Caveat: GoAccess only gives hourly buckets aggregated over the window, so these are averages.
True per-second peaks are unknown until OpenTelemetry metrics are re-enabled.
The night floor is ~65% of the daytime peak - that is the machines, not the pilots.
-->

---

# Requests per day

```mermaid {scale: 0.6}
xychart-beta
  title "Requests per day (thousands)"
  x-axis ["20.9", "21.9", "22.9", "23.9", "24.9", "25.9", "26.9", "27.9", "28.9", "29.9", "30.9", "1.10", "2.10", "3.10", "4.10", "5.10", "6.10", "7.10", "8.10"]
  y-axis "k req" 0 --> 1500
  bar [1210, 1232, 1240, 1224, 1248, 1224, 1425, 1223, 1226, 1234, 1266, 1135, 1188, 1187, 1214, 1210, 1193, 1141, 1108]
```


---

# Humans vs machines

| User agent family | Requests | Share |
|---|---:|---:|
| Unknown / empty UA | 11.6 M | 48 % |
| Crawlers & apps (CFNetwork, Python, ParaRidge, ...) | 7.9 M | 32 % |
| Browsers (Chrome, Safari, Firefox, Edge, ...) | ~3.7 M | 15 % |
| HTTP libraries & others | 0.3 M | 1 % |

The API Terms of Use ask every client to **identify itself** - most do, but not all.

<!--
Browsers are ~15% of requests but the majority of bytes.
-->

---

# Where are the users?

<div class="grid grid-cols-2 gap-10 pt-2 pr-20">
<div>

| Continent | Requests / day | Share |
|---|---:|---:|
| Europe | 986 k | 81.0 % |
| North America | 131 k | 10.8 % |
| Asia | 39 k | 3.2 % |
| South America | 22 k | 1.8 % |
| Oceania | 21 k | 1.7 % |
| Africa | 17 k | 1.4 % |

</div>
<div>

| Country | Requests / day | Share |
|---|---:|---:|
| 🇫🇷 France | 334 k | 27.4 % |
| 🇨🇭 Switzerland | 231 k | 19.0 % |
| 🇩🇪 Germany | 153 k | 12.6 % |
| 🇺🇸 United States | 89 k | 7.3 % |
| 🇳🇱 Netherlands | 41 k | 3.4 % |
| 🇮🇹 Italy | 38 k | 3.1 % |

</div>
</div>

---

# What's next: wind alarms

<div class="flex gap-6 items-start justify-center pt-2">
<img src="/alarms-1.png" class="rounded shadow h-[21rem]" />
<img src="/alarms-2.png" class="rounded shadow h-[21rem]" />
<img src="/alarms-3.png" class="rounded shadow h-[21rem]" />
</div>

---

# What's next: wind alarms

<div class="flex gap-6 items-start justify-center pt-2">
<img src="/alarms-4.png" class="rounded shadow h-[21rem]" />
<img src="/alarms-5.png" class="rounded shadow h-[21rem]" />
</div>

---
advanceAfterVideo: 5
advanceAfter: 40 # fallback if the video never plays (it is 14 s long)
---

# What's next: your own data sources & data views

<SlidevVideo autoplay autoreset="slide" muted class="rounded shadow h-[21rem] mx-auto mt-2">
  <source src="/data-views.mp4" type="video/mp4" />
</SlidevVideo>

---
layout: center
class: text-center
hideDiscordQr: true
---

# Join our community on Discord

<div class="text-2xl pt-4">
Discuss new features, report bugs, share ideas
</div>

<img src="/discord-qr.svg" alt="Discord invite QR code" class="w-56 h-56 mx-auto my-6 bg-white p-2 rounded" />

Code & issues: [github.com/winds-mobi](https://github.com/winds-mobi)
