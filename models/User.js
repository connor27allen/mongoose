const {model, Schema} = require('mongoose');
const {hash, } = require('bcrypt');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'You must enter a password'],
            //collection must be either new or recreated if you add unique: true
            unique: true,
            validate: {
                validator(val) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig.test(val);
                },
                message: 'email address not formatted correctly'
            }
        },

        password: {
            type: String,
            required: [true, 'You must enter password'],
            minLength: [6, 'Your password must be ...']
        }
    },
);

userSchema.pre('save', async function(next) {
    if (!this.isNew) {
        this.password = await hash(this.password, 10);
    }

    next();
});

userSchema.methods.validatePass = async function(formPassword) {
    const is_valid = await compare(formPassword, this.password);

    return is_valid;
};

userSchema.set('toJSON', {
    transform: (_, user) => {
      delete user.password;
      delete user.__v;
      return user;
    },
  });



const User = model('User', userSchema);

module.exports = User;