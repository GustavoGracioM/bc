require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); 
const postRoutes = require('./src/routes/postRoutes');
const todoRoutes = require('./src/routes/todoRoutes');
const reelRoutes = require('./src/routes/reelRoutes');
 
const app = express(); 
const PORT = 3001;  
    
app.use(cors({ origin: '*' }));
app.use(express.json());  
 

app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));
app.use('/upload-vids',express.static(path.join(__dirname, 'src', 'uploads-vids')));

app.use('/', postRoutes);
app.use('/', todoRoutes);
app.use('/', reelRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 