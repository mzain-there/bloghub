import axios from 'axios';

const API_BASE = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const fetchPosts = async (limit = 30, skip = 0) => {
  try {
    const response = await api.get(`/posts?limit=${limit}&skip=${skip}`);
    return {
      posts: response.data.posts.map(transformPost),
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return transformPost(response.data);
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const searchPosts = async (query) => {
  try {
    const response = await api.get(`/posts/search?q=${query}`);
    return {
      posts: response.data.posts.map(transformPost),
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

const realLifeCategories = [
  'Lifestyle',
  'Travel & Adventure',
  'Food & Cooking',
  'Relationships & Family',
  'Personal Finance',
  'Health & Wellness',
  'Career & Business',
  'Hobbies & DIY',
  'Self Improvement',
  'Education & Learning'
];

const realAuthorNames = [
  'Olivia Johnson', 'Liam Smith', 'Sophia Williams', 'Noah Brown', 'Emma Jones',
  'Jackson Garcia', 'Ava Miller', 'Lucas Davis', 'Isabella Rodriguez', 'Oliver Martinez',
  'Amelia Hernandez', 'Ethan Lopez', 'Mia Gonzalez', 'Mason Wilson', 'Layla Anderson',
  'William Thomas', 'Chloë Taylor', 'James Moore', 'Harper Jackson', 'Alexander Martin',
  'Evelyn Lee', 'Benjamin Perez', 'Aria Thompson', 'Sebastian White', 'Ella Harris',
  'Daniel Sanchez', 'Elizabeth Clark', 'Matthew Ramirez', 'Camila Lewis', 'Henry Robinson'
];

const getCategoryForPost = (post) => {
  const title = (post.title || '').toLowerCase();
  const body = (post.body || '').toLowerCase();

  if (title.includes('cook') || title.includes('food') || title.includes('candy') || title.includes('eat') || title.includes('fire') || body.includes('cook') || body.includes('recipe')) {
    return 'Food & Cooking';
  }
  if (title.includes('forest') || title.includes('tree') || title.includes('rain') || title.includes('wind') || title.includes('wander') || title.includes('door') || body.includes('forest') || body.includes('nature') || body.includes('outdoor')) {
    return 'Travel & Adventure';
  }
  if (title.includes('money') || title.includes('finance') || title.includes('wealth') || title.includes('pay') || body.includes('money') || body.includes('finance') || body.includes('dollar')) {
    return 'Personal Finance';
  }
  if (title.includes('mother') || title.includes('father') || title.includes('son') || title.includes('daughter') || title.includes('love') || title.includes('house') || title.includes('home') || body.includes('family') || body.includes('parent')) {
    return 'Relationships & Family';
  }
  if (title.includes('rule') || title.includes('habit') || title.includes('improve') || title.includes('compare') || body.includes('habit') || body.includes('self') || body.includes('rules')) {
    return 'Self Improvement';
  }
  if (title.includes('panic') || title.includes('health') || title.includes('exercise') || title.includes('step') || title.includes('run') || body.includes('doctor') || body.includes('gym')) {
    return 'Health & Wellness';
  }
  if (title.includes('expert') || title.includes('discipline') || title.includes('work') || title.includes('job') || title.includes('paper') || title.includes('blank') || body.includes('office') || body.includes('career') || body.includes('business')) {
    return 'Career & Business';
  }
  if (title.includes('read') || title.includes('teach') || title.includes('remember') || title.includes('learn') || body.includes('book') || body.includes('learn') || body.includes('study')) {
    return 'Education & Learning';
  }
  if (title.includes('chair') || title.includes('tool') || title.includes('build') || title.includes('hair') || title.includes('robot') || body.includes('furniture') || body.includes('diy') || body.includes('robot')) {
    return 'Hobbies & DIY';
  }
  
  // Fallbacks based on ID
  const index = post.id % realLifeCategories.length;
  return realLifeCategories[index];
};

const transformPost = (post) => ({
  id: `api-${post.id}`,
  title: post.title,
  content: post.body,
  shortDescription: post.body?.substring(0, 150) + '...',
  category: getCategoryForPost(post),
  tags: post.tags || [],
  author: {
    name: realAuthorNames[(post.userId - 1) % realAuthorNames.length] || `Author ${post.userId}`,
    avatar: '',
  },
  coverImage: `https://picsum.photos/seed/post${post.id}/800/400`,
  createdAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
  views: Math.floor(Math.random() * 5000) + 100,
  likes: post.reactions?.likes || Math.floor(Math.random() * 200),
  isApi: true,
});

export default api;
