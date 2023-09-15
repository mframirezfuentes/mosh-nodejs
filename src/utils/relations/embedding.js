const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mframirezfuentes:C5EVGzPcYJ40cfAq@cluster0.y0lcmo9.mongodb.net/playground"
  )
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Could not to connect to mongdb", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});
const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({ name: String, author: authorSchema })
);

const createCourse = async (name, author) => {
  const course = new Course({
    name,
    author,
  });
  const result = await course.save();
  console.log(result);
};

const listCourses = async () => {
  const courses = await Course.find();
  console.log(courses);
};

const updateAuthor = async (courseId) => {
  const course = await Course.updateOne({_id:courseId}, {
    $set:{
        "author.name": "Jhon Smith"
    }
  });

};

//createCourse("Node Course", new Author({ name: "Mosh" }));
updateAuthor("65046150a18424f78bce378c")
//listCourses();
