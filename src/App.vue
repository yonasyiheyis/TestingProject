<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">EHR</div>
        <div>
          <div class="brand-title">Selam Clinic</div>
          <div class="brand-subtitle">Ethiopia PoC</div>
        </div>
      </div>

      <nav class="nav">
        <RouterLink class="nav-link" to="/">Appointment</RouterLink>
        <RouterLink class="nav-link" to="/analytics">Analytics</RouterLink>
        <RouterLink class="nav-link" to="/invoices">Invoives</RouterLink>
        <RouterLink class="nav-link" to="/patients">Patients</RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div class="status-pill">
          <span class="dot"></span>
          System Online
        </div>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div>
          <div class="eyebrow">EHR FRONT DESK</div>
          <h1 class="page-title">Clinic Operations Dashboard</h1>
        </div>
        <div class="topbar-actions">
          <button class="ghost-button">New Patient</button>
          <button class="primary-button">Schedule Visit</button>
        </div>
      </header>

      <section class="content">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
