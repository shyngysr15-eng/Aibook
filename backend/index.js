const express = require('express');
const cors = require('cors');
const Fuse = require('fuse.js');
const books = require('../data/books.json');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Fuse.js options for weighted search
const fuseOptions = {
    keys: [
        { name: 'name', weight: 0.4 },
        { name: 'author', weight: 0.2 },
        { name: 'description', weight: 0.3 },
        { name: 'genre', weight: 0.1 }
    ],
    threshold: 0.4, // Lower threshold means more strict matching
    includeScore: true
};

const fuse = new Fuse(books, fuseOptions);

app.get('/api/search', (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.json(books.slice(0, 5));
    }

    const results = fuse.search(q);
    // Return top 5 results, mapped back to original objects
    const topResults = results.slice(0, 5).map(result => result.item);

    res.json(topResults);
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
