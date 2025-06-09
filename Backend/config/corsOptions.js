var corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://projectmanagement-1-d01r.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

module.exports = corsOptions;