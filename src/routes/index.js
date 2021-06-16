
const Router=require('express').Router;

const botRouter=require('./search');

const v1Router = Router();
v1Router.use('/api', botRouter);

module.exports=v1Router;