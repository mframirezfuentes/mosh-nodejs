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
  new mongoose.Schema(
    {
    name: String,
    authors: [authorSchema] //this is a subdocument, using Array
  })
);

const createCourse = async (name, authors) => {
  const course = new Course({
    name,
    authors,
  });
  const result = await course.save();
  console.log(result);
};

const listCourses = async () => {
  const courses = await Course.find();
  console.log(courses);
};

const updateAuthor = async (courseId) => {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "Jhon Smith",
      },
    }
  );
};
//worked with subdocument
const addAuthor = async (courseId, author) => {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
};
const removeAuthor = async (courseId, authorId) => {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne();
  course.save();
};
//createCourse("Node Course", [
//new Author({ name: "Mosh" }),
//  new Author({ name: "Fernanda" }),
//]);
// addAuthor("6504ba0e29064874a79ed10a", new Author({ name: "Amy" }));
//updateAuthor("65046150a18424f78bce378c");
removeAuthor("6504ba0e29064874a79ed10a", "6504ba0e29064874a79ed108" )
//listCourses();
