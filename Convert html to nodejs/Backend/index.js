const express = req('express');
const dotenv = req('dotenv');
const cors = req('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userRoutes = req('./userRoutes');
app.use('/', userRoutes);

// Start server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Server failed to start:', err);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});
