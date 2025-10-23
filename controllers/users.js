const User= require("../models/user");

module.exports.renderSignupForm= (req,res)=>{
    res.render("./users/signup.ejs");
}
module.exports.signup= async(req,res)=>{
    try{
        let { username, email, password}= req.body;
        const  newUSer= new User({ email, username});
        const registeredUser= await User.register(newUSer, password);
        console.log(registeredUser);
        //.login method of passport directly logsin as soon as we signup
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        })
       
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm= (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login= async (req,res)=>{
        req.flash("success","Welcome back to Wanderlust!");
        let redirectUrl=res.locals.redirectUrl || "/listings";//redirects to the page we want to go like previously when
        //we clicked on add new we went to login page then to /listing, now we will go to add new page after login
        res.redirect(redirectUrl);
}

module.exports.logout= (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
}