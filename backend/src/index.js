const app = require('./app');
const PORT = process.env.PORT || 4000;

const boardRoutes = require('./routes/boards');
app.use('/api/boards', boardRoutes);

const cardRoutes = require('./routes/cards');
app.use('/api/cards', cardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});