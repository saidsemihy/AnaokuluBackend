const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const classRoute = require('./class.route');
const studentRoute = require('./student.route');
const config = require('../../config/config');
const schoolManagerRoute = require('./schoolmanager.route');
const documentRoute = require('./document.route');
const schoolRoute = require('./school.route');
const teacherRoute = require('./teacher.route');
const parentRoute = require('./parent.route');
const announcementRoute = require('./modules/announcement.route');
const calendarRoute = require('./modules/calendar.route');
const courseScheduleRoute = require('./modules/courseschedule.route');
const dailyReportRoute = require('./modules/dailyreport.route');
const foodListRoute = require('./modules/foodlist.route');
const medicineTrakRoute = require('./modules/medicinetrack.route');
const actionRoute = require('./action.route');
const chatRoute = require('./chat/chat.route');
const galeryRoute = require('./galery.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/schoolmanagers',
    route: schoolManagerRoute,
  },
  {
    path: '/documents',
    route: documentRoute,
  },
  {
    path: '/classes',
    route: classRoute,
  },
  {
    path: '/schools',
    route: schoolRoute,
  },
  {
    path: '/teachers',
    route: teacherRoute,
  },
  {
    path: '/parents',
    route: parentRoute,
  },
  {
    path: '/announcements',
    route: announcementRoute,
  },
  {
    path: '/calendars',
    route: calendarRoute,
  },
  {
    path: '/courseschedules',
    route: courseScheduleRoute,
  },
  {
    path: '/dailyreports',
    route: dailyReportRoute,
  },
  {
    path: '/foodlists',
    route: foodListRoute,
  },
  {
    path: '/medicinetracks',
    route: medicineTrakRoute,
  },
  {
    path: '/actions',
    route: actionRoute,
  },
  {
    path: '/chat',
    route: chatRoute,
  },
  {
    path: '/galery',
    route: galeryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
