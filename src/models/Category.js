const mongoose = require('mongoose')
const slugify = require('slugify')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    type: { type: String },
    categoryImage: { type: String },
    parentId: { type: String }
}, { timestamps: true })

categorySchema.pre('save', async function (next) {
    const category = this
    if (category.isModified('name')) {
        category.slug = slugify(category.name)
    }
    next()
})


module.exports = mongoose.model('Category', categorySchema)