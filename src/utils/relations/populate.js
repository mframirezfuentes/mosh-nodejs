const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mframirezfuentes:C5EVGzPcYJ40cfAq@cluster0.y0lcmo9.mongodb.net/playground"
  )
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Could not to connect to mongdb", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author", //Author collection
    },
  })
);

const createAuthor = async (name, bio, website) => {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(result);
};

const createCourse = async (name, author) => {
  const course = new Course({
    name,
    author,
  });
  const result = await course.save();
  console.log(result);
};

const listCourses = async () => {
  const courses = await Course.find().populate("author", "name -_id").select("name author");
  console.log(courses);
};

//createAuthor("Mosh", "My Bio", "My website")
//createCourse("Node Course", "65045a37572a7213da9ea8ae")
listCourses();
