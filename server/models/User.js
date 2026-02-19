
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    moodHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mood'
    }]
});

module.exports = mongoose.model('User', UserSchema);
