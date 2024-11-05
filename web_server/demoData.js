const mongoose = require('mongoose');
const User = require('./models/User');

// MongoDB connection string
const dbURI = 'mongodb+srv://abdo202224:RdZjLTYmNuIQUhbs@hollywood.j2xm4.mongodb.net/?retryWrites=true&w=majority&appName=Hollywood&ssl=true';

const userDemo = [
    {
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'password-123',
        role: 'author',
    },
    {
        name: 'alice smith',
        email: 'alice@alice.com',
        password: 'password-123',
        role: 'visitor',
    },
    {
        name: 'bob smith',
        email: 'bob@smith.com',
        password: 'password-123',
        role: 'editor',
    }
]


const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Clear existing data
        await User.deleteMany();

        // Create demo blogs
        const createdBlogs = await User.insertMany(userDemo);

        // // Link comments to their respective blogs
        // demoComments.forEach((comment, index) => {
        //     comment.blog = createdBlogs[index % demoBlogs.length]._id;
        // });
        
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
