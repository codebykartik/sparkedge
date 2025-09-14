    Quick README - SparkEdge backend integrated into project


    Location: ./sparkedge-backend/


    Steps to run locally:
1. cd sparkedge-backend
2. copy .env.example -> .env and fill SMTP values and EMAIL_TO
3. npm install
4. node index.js
5. Open sample-form.html in your browser and submit (or update your frontend to post to http://localhost:3000/contact)

Security:
- Don't commit .env to version control.
- For Gmail use App Password.

If you want me to automatically update your frontend form to point to backend, tell me which HTML file contains the form and I'll patch it.
