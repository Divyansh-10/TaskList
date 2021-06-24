

//module.exports.name...here name is what the app.js should use to cal it...so in app.js..use :  var date = getDate();
//getDay here is anonymous function
//getDate() is original method..getDay() is refactored version.

let date = new Date();

module.exports.getDate = getDate;

function getDate()
{

  const options = {
    weekday : "long" ,
    day : "numeric" ,
    month : "long" ,
    year : "numeric"
  };

  return  date.toLocaleDateString("en-US", options);

}

exports.getDay = () =>
{
  const options = {
    weekday : "long" ,
  };

  return date.toLocaleDateString("en-US", options);
}
