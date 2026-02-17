<template>
  <div class="analytics">
    <section class="card">
      <div class="card-header">
        <div>
          <h2>Weekly Clinic Pulse</h2>
          <p class="muted">Mock analytics for appointments, triage, and follow-ups.</p>
        </div>
        <button class="ghost-button small">Export</button>
      </div>

      <div class="chart-row">
        <div class="metric">
          <div class="metric-label">Appointments</div>
          <div class="metric-value">142</div>
          <div class="metric-trend up">+12% vs last week</div>
        </div>
        <div class="metric">
          <div class="metric-label">No-Shows</div>
          <div class="metric-value">9</div>
          <div class="metric-trend down">-4% improvement</div>
        </div>
        <div class="metric">
          <div class="metric-label">Avg. Wait Time</div>
          <div class="metric-value">18m</div>
          <div class="metric-trend up">+2m busy week</div>
        </div>
      </div>

      <div class="bar-chart">
        <div class="bar" v-for="bar in bars" :key="bar.label">
          <div class="bar-fill" :style="{ height: bar.value + '%' }"></div>
          <span>{{ bar.label }}</span>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-header">
        <div>
          <h2>Care Mix</h2>
          <p class="muted">Distribution across services for the month.</p>
        </div>
      </div>

      <div class="donut-grid">
        <div class="donut">
          <svg viewBox="0 0 42 42">
            <circle class="donut-ring" cx="21" cy="21" r="15.915" />
            <circle class="donut-segment" cx="21" cy="21" r="15.915" stroke-dasharray="55 45" />
          </svg>
          <div class="donut-label">
            <div class="donut-value">55%</div>
            <div class="muted">General Care</div>
          </div>
        </div>
        <div class="donut">
          <svg viewBox="0 0 42 42">
            <circle class="donut-ring" cx="21" cy="21" r="15.915" />
            <circle class="donut-segment accent" cx="21" cy="21" r="15.915" stroke-dasharray="30 70" />
          </svg>
          <div class="donut-label">
            <div class="donut-value">30%</div>
            <div class="muted">Maternal Health</div>
          </div>
        </div>
        <div class="donut">
          <svg viewBox="0 0 42 42">
            <circle class="donut-ring" cx="21" cy="21" r="15.915" />
            <circle class="donut-segment muted" cx="21" cy="21" r="15.915" stroke-dasharray="15 85" />
          </svg>
          <div class="donut-label">
            <div class="donut-value">15%</div>
            <div class="muted">Immunization</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const bars = [
  { label: "Mon", value: 70 },
  { label: "Tue", value: 85 },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 95 },
  { label: "Fri", value: 80 },
  { label: "Sat", value: 40 },
  { label: "Sun", value: 25 }
];
</script>
