<template>
  <div class="page-grid">
    <section class="card">
      <div class="card-header">
        <div>
          <h2>Appointment Calendar</h2>
          <p class="muted">Add quick bookings for patient intake and follow-ups.</p>
        </div>
        <button class="ghost-button small">Today</button>
      </div>

      <div class="calendar">
        <div class="calendar-row calendar-head">
          <div v-for="day in days" :key="day" class="calendar-cell">
            {{ day }}
          </div>
        </div>
        <div class="calendar-row">
          <div v-for="slot in slots" :key="slot.day" class="calendar-cell">
            <div class="calendar-date">{{ slot.date }}</div>
            <div class="calendar-appointments">
              <div
                v-for="appointment in slot.appointments"
                :key="appointment.time + appointment.name"
                class="appointment-pill"
              >
                <span class="time">{{ appointment.time }}</span>
                <span class="name">{{ appointment.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-header">
        <div>
          <h2>Quick Schedule</h2>
          <p class="muted">Mock form for the front desk to draft a visit.</p>
        </div>
      </div>

      <form class="form-grid">
        <label class="field">
          <span>Patient Name</span>
          <input type="text" placeholder="e.g., Lensa Girma" />
        </label>
        <label class="field">
          <span>Visit Type</span>
          <select>
            <option>General Consultation</option>
            <option>Antenatal Care</option>
            <option>Immunization</option>
            <option>Pharmacy Pickup</option>
          </select>
        </label>
        <label class="field">
          <span>Date</span>
          <input type="date" />
        </label>
        <label class="field">
          <span>Time</span>
          <input type="time" />
        </label>
        <label class="field full">
          <span>Notes</span>
          <textarea rows="3" placeholder="Triage notes, preferred language, etc."></textarea>
        </label>
        <div class="form-actions">
          <button type="button" class="ghost-button">Clear</button>
          <button type="button" class="primary-button">Save Draft</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const slots = [
  {
    day: "Mon",
    date: "17",
    appointments: [
      { time: "09:00", name: "Lensa G." },
      { time: "11:30", name: "Abel A." }
    ]
  },
  {
    day: "Tue",
    date: "18",
    appointments: [
      { time: "10:00", name: "Mulu A." },
      { time: "15:00", name: "Sara K." }
    ]
  },
  {
    day: "Wed",
    date: "19",
    appointments: [{ time: "13:00", name: "Biruk D." }]
  },
  {
    day: "Thu",
    date: "20",
    appointments: [
      { time: "09:30", name: "Tigist S." },
      { time: "16:00", name: "Yonas W." }
    ]
  },
  {
    day: "Fri",
    date: "21",
    appointments: [{ time: "08:30", name: "Samuel F." }]
  },
  {
    day: "Sat",
    date: "22",
    appointments: []
  },
  {
    day: "Sun",
    date: "23",
    appointments: []
  }
];
</script>
