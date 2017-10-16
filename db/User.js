const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const autoIncrement = require('mongoose-auto-increment')
const SALT_WORK_FACTOR = 10

let userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true,
		unique: true
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
})

autoIncrement.initialize(mongoose.connection)
userSchema.plugin(autoIncrement.plugin, 'User')

userSchema.pre('save', function(next) {
    var user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash;
            next()
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword) {
	return new Promise((resolve, reject) => {
  	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
	   	if (err) {
	   		reject(err)
	   	} else {
	   		resolve(isMatch)
	   	}
	  })
  })
};

module.exports = {
	User: mongoose.model('User', userSchema)
}