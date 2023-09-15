const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mframirezfuentes:C5EVGzPcYJ40cfAq@cluster0.y0lcmo9.mongodb.net/playground"
  )
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Could not to connect to mongdb", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course must have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Mongodb",
    category: "Web",
    author: "Daniela Ramírez",
    tags: ["backend"],
    isPublished: true,
    price: 15,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
};
createCourse();

const getCourses = async () => {
  const courses = await Course.find({
    author: "Diego Martinez",
    isPublished: true,
  })
    // //Start with
    // .find({ author: /^Diego/ })
    // //end with
    // .find({ author: /Martinez$/i })
    // //contains
    // .find({ author: /.*Mosh.*/ })
    .limit(10)
    .sort({ name: 1 })
    .count();
  console.log(courses);
};
//getCourses();

const updateCourse = async (id) => {
  const course = await Course.findById(id);
  if (!course) return;

  course.set({
    isPublished: true,
    author: "Another Author",
  });
  const result = await course.save();
  console.log(result);
};

const listCourses = async () => {
  const courses = Course.find().select("name");
  console.log(courses);
};
