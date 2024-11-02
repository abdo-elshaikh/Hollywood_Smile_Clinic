const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const Comment = require('./models/Comment');
const Subscribe = require('./models/Subscribe');

// MongoDB connection string
const dbURI = 'mongodb://localhost:27017/hollywood_smile_web_server';

// Sample blogs related to dental care and smile design
const demoBlogs = [
    {
        title: 'The Benefits of a Hollywood Smile',
        content: 'A Hollywood smile can boost your confidence and improve your overall dental health...',
        author: '6701a1f164eb3e4b64fe9748',
        date: new Date(),
        categories: ['Cosmetic Dentistry', 'Dental Care'],
        tags: ['Hollywood Smile', 'Dental Health'],
    },
    {
        title: 'Teeth Whitening: What You Need to Know',
        content: 'Teeth whitening is a safe and effective way to achieve a brighter smile...',
        author: '6701a1f164eb3e4b64fe9748',
        date: new Date(),
        tags: ['Teeth Whitening', 'Dental Procedures'],
        categories: ['Cosmetic Dentistry', 'Dental Care'],
    },
    {
        title: 'Choosing the Right Veneers for Your Smile',
        content: 'Veneers are a popular choice for enhancing smile aesthetics...',
        author: '671e85af16a25e2898147cb8',
        date: new Date(),
        categories: ['Cosmetic Dentistry', 'Dental Care'],
        tags: ['Veneers', 'Smile Design'],
    },
    {
        title: 'How to Maintain Your Smile After a Dental Procedure',
        content: 'Proper aftercare is essential to keep your smile bright and healthy...',
        author: '6701a1f164eb3e4b64fe9748',
        date: new Date(),
        categories: ['Cosmetic Dentistry', 'Dental Care'],
        tags: ['Aftercare', 'Dental Care'],
    },
    {
        title: 'The Latest Advances in Cosmetic Dentistry',
        content: 'Cosmetic dentistry continues to evolve with new technologies and techniques...',
        author: '671e85af16a25e2898147cb8',
        createdAt: new Date(),
        categories: ['Cosmetic Dentistry', 'Dental Care'],
        tags: ['Cosmetic Dentistry', 'Dental Technology'],
    },
];

const demoSubscribers = [
    {
        name: 'John Doe',
        email: '6mM0S@example.com',
        subscribed: true,
    },
    {
        name: 'Jane Smith',
        email: 'z5Q9S@example.com',
        subscribed: true,
    },
    {
        name: 'Alice Johnson',
        email: 'kzQ9F@example.com',
        subscribed: true,
    },
    {
        name: 'Bob Brown',
        email: 'L9e7n@example.com',
        subscribed: true,
    },
];

// Sample comments for the dental blog posts
const demoComments = [
    {
        blog: null, // Will be linked to blogs after blogs are created
        name: 'Anna Williams',
        content: 'This article gave me a lot of confidence about getting a Hollywood smile!',
        likes: 8,
        approved: true,
    },
    {
        blog: null, // Will be linked to blogs after blogs are created
        name: 'James Robinson',
        content: 'I was considering teeth whitening, and this information helped a lot. Thanks!',
        likes: 5,
        approved: true,
    },
    {
        blog: null, // Will be linked to blogs after blogs are created
        name: 'Jessica Lee',
        content: 'Great advice on veneer options, very insightful!',
        likes: 7,
        approved: true,
    },
    {
        blog: null, // Will be linked to blogs after blogs are created
        name: 'David Smith',
        content: 'The aftercare tips were super helpful, thanks for sharing!',
        likes: 6,
        approved: true,
    },
    {
        blog: null, // Will be linked to blogs after blogs are created
        name: 'Olivia Martinez',
        content: 'I didn’t know there were so many advances in cosmetic dentistry!',
        likes: 4,
        approved: true,
    },
    {
        blog: null, // Will be linked to blogs after blogs are created
        name: 'Michael Johnson',
        content: 'The latest advances in cosmetic dentistry are amazing!',
        likes: 9,
        approved: true,
    },
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Clear existing data
        await Blog.deleteMany({});
        await Comment.deleteMany({});

        // Create demo blogs
        const createdBlogs = await Blog.insertMany(demoBlogs);

        // Link comments to their respective blogs
        demoComments.forEach((comment, index) => {
            comment.blog = createdBlogs[index % demoBlogs.length]._id;
        });

        // Create demo comments
        await Comment.insertMany(demoComments);

        console.log('Demo data for Hollywood Smile Center dental clinic created successfully!');
    } catch (error) {
        console.error('Error creating demo data:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

// Execute the seed function
seedDatabase();
