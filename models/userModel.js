import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Kullancı Alanı Gereklidir.'],
      lowercase: true,
      validate: [validator.isAlphanumeric, 'İngilice Karakter Kullanınız.'],
    },
    email: {
      type: String,
      required: [true, 'E-Mail Alanı Gereklidir. '],
      unique: true,
      validate: [validator.isEmail, 'Geçerli Bir E-Mail Giriniz'],
    },
    password: {
      type: String,
      required: [true, 'Şifre Alanı Gereklidir.'],
      minLength: [4, 'Lütfen En Az 4 Karakter Giriniz'],
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

export default User;
