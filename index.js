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
app.use('/', reelRoutes);

// LOGIN
app.post("/auth/login", (req, res) => {
  const { password } = req.body;

  if (password !== process.env.PASSWORD_FRONT) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign(
    { authenticated: true },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return res.json({ token });
});

// VALIDAR TOKEN
app.post("/auth/validate", (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch {
    res.json({ valid: false });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 