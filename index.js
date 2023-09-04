const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require(`./template/replaceTemplate`);
//Read data from file
//Template
const tempCourse = fs.readFileSync(
    `${__dirname}/data/data.json`,
    `utf-8`);
//function replaceTemplate(htmlStr, course){
// const replaceTemplate = (htmlStr, course)=>{ //fat arrow function or lambda
//     let output = htmlStr.replace(/{%NAME%}/g, course.courseName);
//     output = output.replace(/{%IMAGE%}/g , course.image) ;
//     output = output.replace(/{%FROM%}/g , course.from) ;
//     output = output.replace(/{%INSTRUCTOR%}/g , course.instructor) ;
//     output = output.replace(/{%CREDITS%}/g , course.credits) ;
//     output = output.replace(/{%DESCRIPTION%}/g , course.description) ;
//     output = output.replace(/{%ID%}/g , course.id) ;
//     return output;
// }
//Template
const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/modules/templateCourse-1.html`,
    `utf-8`);
const dataObj = JSON.parse(tempCourse);
//Create Server
//const server = httpServer.createServer(function (req, res) { //call back function
const server = http.createServer( (req, res) =>{ //call back function
    // const urlParameter = url.parse(req.url, true);
    // console.log(JSON.stringify(urlParameter.query));//convert to string
    // console.log(JSON.stringify(urlParameter.pathname));//convert to string
    const {query, pathname} = url.parse(req.url, true); //object destructors
    if(query.id){ //if there is query parameter named id
        //Courses page
        if(pathname === '/' || pathname.toLowerCase() === '/courses'){
            res.writeHead(200,{ //Every thing ran successfully
                'Content-Type': "text/html"});
            const course = dataObj[Number(query.id)]//convert string to numeric value
            //const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course);//function that will replace
            // res.end(`We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
            // ${JSON.stringify(course)}//convert object back to string
            // `);
            res.end(courseHTML);
    }
    else{
        res.writeHead(404, {//Server did not find what you were looking for
            'Content-type':'text/plain'});
        res.end('Resource not found')}
    }
});
//Start Listening to requests
server.listen(8000, 'localhost', ()=> {
    console.log('Listening to requests on port 8000');
});