const {transporter, mailOptions} = require('../services/email.js')

const sendMail = async(req,res)=>{
    try {
        const response = await transporter.sendMail(mailOptions)
        console.log('Mail enviado');

    } catch (error) {
        console.log(error);
    }
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        
        if (err) {
            return next(err);
        }
        if (!user) return res.status(401).json({ data: info });
        
        res.json({ msg: 'signup OK' , user:user});
    
        })(req, res,next)
}

module.exports = sendMail