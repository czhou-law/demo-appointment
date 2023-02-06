# Appointment Code Challenge

## How to run

### Running backend service

1. `cd ./backend`
2. `npm install`
3. `npm start`

### Running frontend service

1. `cd ./frontend`
2. `npm install`
3. `npm start`

## Notes

1. To adhere the requirement "Users need to book the appointment 2 business days in advance", even the Saturday and Sunday, the available time for Friday, Saturday, and Sunday booking are start from Wednesday
2. To simplify the build, users is not implement in this demo.
3. Appointment booking is open for public to access. The appointments is binding to the customer email.
4. Cancel and edit booking is definitely not secured, but simplified for this demo. Some control can be consider is adding email/sms verification