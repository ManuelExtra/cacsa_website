const jwt = require("jsonwebtoken");
// const Users = require("../../auth/models/Users");
// const Orders = require("../../orders/models/Transactions");


const DIRNAME = 'dashboard';

module.exports = {
    index: (req, res) => {
        res.render(`${DIRNAME}/index`)
    },
    profile: (req, res) => {
        res.render(`${DIRNAME}/profile`);
    },
    settings: (req, res) => {
        res.render(`${DIRNAME}/settings`);
    },
    administrators: (req, res) => {
        res.render(`${DIRNAME}/administrators`);
    },
    groups: (req, res) => {
        res.render(`${DIRNAME}/groups`);
    }, 
    customers: (req, res) => {
        res.render(`${DIRNAME}/customers`);
    },   
    vendors: (req, res) => {
        res.render(`${DIRNAME}/vendors`);
    },   
    logistics: (req, res) => {
        res.render(`${DIRNAME}/logistics`);
    },   
    categories: (req, res) => {
        res.render(`${DIRNAME}/categories`);
    },   
    orders: (req, res) => {
        res.render(`${DIRNAME}/orders`);
    },   
    notifications: (req, res) => {
        res.render(`${DIRNAME}/notifications`);
    },   
    setLoginToken: (req, res) => {
        const {user_token} = req.body;

        res.cookie("user_token", user_token);
        res.json({
            error: 0,
            user_token
        });
    }, 

    logout: (req, res) => {
        res.clearCookie('user_token');
        res.redirect('/');
    }
}