# averygallagan-NoteTaker
Note Taker Challenge

This week we were tasked with creating the back end of the note taking application so that it would send you to the notes.html file, get any existing notes, and post any new notes added to the page. 

This was achieved by first making a get route to get the notes.html. The GET /notes route was linked to the notes.html file. Similarly, the GET * route returned the user to the index.html file. 

The next step was creating the GET /api/notes route. This would read any existing data in the db.json file and return any previous notes that were already in the file. 

The POST /api/notes route would add the newly created note to the db.json file and then would be added to the page using the previous GET route. Each note is given a unique ID with the uuid package. 

To run this project you need to install express and uuid in the terminal. 

deployed site: https://averygallagan-notetaker.onrender.com/
github repo: https://github.com/averygallagan/averygallagan-NoteTaker