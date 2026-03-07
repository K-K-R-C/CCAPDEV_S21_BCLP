const mongoose = require('mongoose');
const User = require('./model/user');
const Post = require('./model/post');
const Comment = require('./model/comment');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/gunitaph')
    .then(() => console.log('MongoDB connected for seeding'))
    .catch((err) => console.log('MonoDB connection error: ', err));

// To populate database with sample data
const seedData = async () => 
{
    try
    {
        // Clear existing data
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});

        // 1.) Create 5 users
        const users = await User.create([
            {
                username: 'batmeow', 
                handle: '@dlsu-pusa', 
                password: 'trestres123', 
                bio: 'Meow meow meow meow meow meow meow', 
                location: 'Manila, Philippines', 
                profilePic: '/MCO1/images/profile.jpg', 
                followers: 100000, 
                following: 1, 
                postCount: 1
            }, 

            {
                username: 'kaloy', 
                handle: '@yolakay', 
                password: 'karlkarl123', 
                bio: 'YOLO', 
                location: 'Cebu, Philippines', 
                profilePic: '/MCO1/images/kaloyprofile.jpg', 
                followers: 100000, 
                following: 1, 
                postCount: 1
            }, 

            {
                username: 'ventilogz', 
                handle: '@travelMaster',
                password: 'ventvent123', 
                bio: 'Travel lover 🌴 Always planning the next family trip.', 
                location: 'Cebu, Philippines', 
                profilePic: '/MCO1/images/ventilogzprofile.jpg',
                followers: 3200,
                following: 120,
                postCount: 1
            }, 

            {
                username: 'ophiuche', 
                handle: '@serEndip!ty', 
                password: 'ophiophi123', 
                bio: 'Hiking + sunrise pics 🌄 Always chasing fresh air and mountain views.', 
                location: 'Benguet, Philippines', 
                profilePic: '/MCO1/images/ophiucheprofile.jpg',
                followers: 8400,
                following: 410,
                postCount: 1
            }, 

            {
                username: 'monami', 
                handle: '@minomikami', 
                password: 'monamona123', 
                bio: 'Coffee lover ☕ | Slow mornings & scenic views 🌄', 
                location: 'Tagaytay, Philippines', 
                profilePic: '/images/monami.jpg',
                followers: 12300,
                following: 890,
                postCount: 1
            }
        ])

        // 2.) Create 5 posts
        const posts = await Post.create([
            {
                title: 'Finally touching grass <3', 
                body: 'Back in Boracay after a long semester and it still feels unreal. White Beach in the afternoon hits different — soft sand, clear water, and that golden sunset glow. Sometimes you just need a quick island reset.', 
                author: users[0]._id, 
                images: ['/MCO1/images/boracay1.jpg', '/MCO1/images/boracay2.jpg'], 
                hashtags: ['#Beachin\'', '#Hot', '#Tan'], 
                commentCount: 15,
                upvotes: [],
                downvotes: []
            }, 

            {
                title: 'Dumaguete is such a hidden gem!', 
                body: 'You should visit this place guys! Beautiful place and people here are very nice. It\'s a must-visit place in the Philippines.', 
                author: users[1]._id, 
                images: ['/MCO1/images/kaloypost1.jpeg', '/MCO1/images/kaloypost2.jpg', '/MCO1/images/kaloypost3.jpg'], 
                hashtags: ['#Dumaguete', '#HiddenGem', '#TravelPhilippines'], 
                commentCount: 3,
                upvotes: [],
                downvotes: []
            }, 

            {
                title: 'Any place to visit in Bohol?', 
                body: 'I am planning to visit Bohol with my family soon. Any recommendations guys? Anong must-try there?', 
                author: users[2]._id, 
                images: ['/MCO1/images/ventilogzpost1.jpg'], 
                hashtags: ['#Bohol', '#TravelPhilippines', '#FamilyTrip'], 
                commentCount: 5,
                upvotes: [],
                downvotes: []
            }, 

            {
                title: 'Morning hikes hit different 🌄 Fresh air, zero stress 😌', 
                body: 'Went to hike with my boyfriend in Mt. Pulag!', 
                author: users[3]._id, 
                images: ['/MCO1/images/ophiuchepost1.jpg'], 
                hashtags: ['#MtPulag', '#Hiking', '#NatureLovers'], 
                commentCount: 0,
                upvotes: [],
                downvotes: []
            }, 

            {
                title: 'Tagaytay mornings are everything @CubiCafe', 
                body: 'Seriously, the view of Taal never gets old. Foggy, fresh, and perfect coffee weather.', 
                author: users[4]._id, 
                images: ['/MCO1/images/monamipost.jpg'], 
                hashtags: ['#Tagaytay', '#MorningViews', '#CoffeeLovers'], 
                commentCount: 0,
                upvotes: [],
                downvotes: []
            }
        ]);

        //3.) Create 5 comments (with nested replies)
        const parentComments = await Comment.create([
            {
                text: 'Agree! Try the seaside boulevard at sunset - super chill.', 
                author: users[1]._id, 
                post: posts[1]._id, 
                parentComment: null,
                upvotes: [],
                downvotes: []
            },

            {
                text: 'Warning: May Cause Nostalgia', 
                author: users[1]._id, 
                post: posts[0]._id, 
                parentComment: null,
                upvotes: [],
                downvotes: []
            },

            {
                text: 'Grass touching era fr.', 
                author: users[3]._id, 
                post: posts[0]._id, 
                parentComment: null,
                upvotes: [],
                downvotes: []
            }
        ]);

        const childComments = await Comment.create([
            {
                text: 'Haha totally agree!',
                author: users[0]._id,
                post: posts[0]._id,
                parentComment: parentComments[1]._id,
                upvotes: [],
                downvotes: []
            },

            {
                text: 'Sana makapunta rin ako dun soon.',
                author: users[2]._id,
                post: posts[0]._id,
                parentComment: parentComments[1]._id,
                upvotes: [],
                downvotes: []
            }
        ]);

        const comments = [...parentComments, ...childComments];

        console.log('Seed data inserted successfully!');
        console.log(`${users.length} users created`);
        console.log(`${posts.length} posts created`);
        console.log(`${comments.length} comments created`);

        process.exit();
    }
    catch (err)
    {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();