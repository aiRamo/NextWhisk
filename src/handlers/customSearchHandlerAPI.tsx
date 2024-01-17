import axios from 'axios';

interface SearchItem {
    link: string;
    pagemap?: {
      cse_thumbnail?: Array<{ src: string }>;
    };
  }

export const handleSearch = async (query: string, setResults: (value: SearchItem[]) => void, setLoading: (value: boolean) => void) => {
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:3000/search', { query });
        const items: SearchItem[] = response.data.items;

        // Extract only link and thumbnail URI
        const results = items.map(item => {
            return {
                link: item.link,
                thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src || '' // Using optional chaining and nullish coalescing
            };
        });

        console.log(results); // Log the simplified search results

        setResults(results);

        return response.status;
      } catch (error) {
        console.error('Error during search:', error);
      } finally {
        setLoading(false);
      }
};