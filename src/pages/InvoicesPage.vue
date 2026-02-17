<template>
  <div class="page-grid">
    <section class="card">
      <div class="card-header">
        <div>
          <h2>Invoices</h2>
          <p class="muted">Dummy billing list for testing navigation.</p>
        </div>
        <button class="primary-button small">Create Invoice</button>
      </div>

      <div class="table">
        <div class="table-row table-head">
          <span>Invoice</span>
          <span>Patient</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        <div v-for="row in rows" :key="row.id" class="table-row">
          <span>{{ row.id }}</span>
          <span>{{ row.patient }}</span>
          <span>{{ row.amount }}</span>
          <span class="status" :class="row.statusClass">{{ row.status }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const rows = [
  { id: "INV-2101", patient: "Lensa Girma", amount: "1,250 ETB", status: "Pending", statusClass: "pending" },
  { id: "INV-2102", patient: "Abel Ayele", amount: "850 ETB", status: "Paid", statusClass: "paid" },
  { id: "INV-2103", patient: "Tigist Shiferaw", amount: "1,980 ETB", status: "Pending", statusClass: "pending" },
  { id: "INV-2104", patient: "Yonas Wondimu", amount: "620 ETB", status: "Paid", statusClass: "paid" }
];
</script>
