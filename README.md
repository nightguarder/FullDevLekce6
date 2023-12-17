# File upload with React and ExpressJS

- Handling file-upload using ExpressJS on the backend and React for frontend.
- Using `fetch API` and `form-data`

![lekce6Screenshot](public/images/lekce6ReactUpload.png)


## Dependencies

1. Run the template to create React app with Vite:

```pnpm create vite@latest ./ --template react  ```

2. Install neccessary dependencies for this project:

```pnpm i express  express-fileupload axios dotenv nodemon```

3. Run the project on both (client, server) side:

> 1. Start server first
>>```npm run server```
>>> `Server is running at http://localhost:3000`

> 2. Start client side 
>> ```npm run dev```
>>> `VITE  ➜  Local:   http://localhost:5173/`

> 3. Setup cors privelage
>> `in sserver/server.js`
>>> ``//*The React frontend should match this url */
>>> const corsOrigin = 'http://localhost:5173';``
