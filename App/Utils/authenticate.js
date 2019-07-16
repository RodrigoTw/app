/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */

const bcrypt = require('bcrypt');
const AuthorModel = require('../models/Author');
const createToken = require('./createToken');

const authenticate = ({email, password}) =>{
    return new Promise((resolve,reject) =>{

        AuthorModel.findOne({email}).then((user)=>{
            if(!user) reject(new Error("Usuario no existe"));
           /* console.log(user);
            console.log(password);*/

            bcrypt.compare(password,user.password,(err,isValid) => {
               // console.log(err);
                if(err) reject(new Error("Error al crear el Token"));

                isValid ? resolve(createToken(user)): reject("Password no coinciden");
            });

        }).catch(e => reject(e));

    });

};

module.exports = authenticate;