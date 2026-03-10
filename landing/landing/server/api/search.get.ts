import Fuse from 'fuse.js'
import books from '../data/books.json'

export default defineEventHandler(async (event) => {
    const query = getQuery(event).q as string

    if (!query) {
        return books.slice(0, 5)
    }

    const fuseOptions = {
        keys: [
            { name: 'name', weight: 0.4 },
            { name: 'author', weight: 0.2 },
            { name: 'description', weight: 0.3 },
            { name: 'genre', weight: 0.1 }
        ],
        threshold: 0.4,
        includeScore: true
    }

    const fuse = new Fuse(books, fuseOptions)
    const results = fuse.search(query)

    return results.slice(0, 5).map((result: any) => result.item)
})
