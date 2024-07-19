const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status:{
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'], // Optional: restrict to these values
      default: 'TODO',
    },
    date: {
      type: String,
      default: function () {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
    time: {
      type: String,
      default: function () {
        const date = new Date();
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
      },
    },
  },
)

module.exports = mongoose.model("Task", taskSchema)
