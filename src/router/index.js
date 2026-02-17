import { createRouter, createWebHistory } from "vue-router";
import AppointmentPage from "../pages/AppointmentPage.vue";
import AnalyticsPage from "../pages/AnalyticsPage.vue";
import InvoicesPage from "../pages/InvoicesPage.vue";
import PatientsPage from "../pages/PatientsPage.vue";

const routes = [
  { path: "/", name: "Appointment", component: AppointmentPage },
  { path: "/analytics", name: "Analytics", component: AnalyticsPage },
  { path: "/invoices", name: "Invoices", component: InvoicesPage },
  { path: "/patients", name: "Patients", component: PatientsPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
