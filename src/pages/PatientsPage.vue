<template>
  <div class="page-grid">
    <section class="card">
      <div class="card-header">
        <div>
          <h2>Patients</h2>
          <p class="muted">Sample patient registry for the PoC.</p>
        </div>
        <button class="ghost-button small">Add Patient</button>
      </div>

      <div class="patient-grid">
        <div v-for="patient in patients" :key="patient.name" class="patient-card">
          <div class="avatar">{{ patient.initials }}</div>
          <div>
            <div class="patient-name">{{ patient.name }}</div>
            <div class="muted">{{ patient.detail }}</div>
          </div>
          <button class="ghost-button tiny">View</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const patients = [
  { name: "Lensa Girma", initials: "LG", detail: "27 yrs · Addis Ababa" },
  { name: "Mulu Aregash", initials: "MA", detail: "31 yrs · Bahir Dar" },
  { name: "Samuel Fekadu", initials: "SF", detail: "45 yrs · Hawassa" },
  { name: "Tigist Shiferaw", initials: "TS", detail: "34 yrs · Adama" }
];
</script>
